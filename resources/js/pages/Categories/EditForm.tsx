import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { router, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';
import { useState } from 'react';

export interface PageProps extends InertiaPageProps {
    category: Category;
}

export default function EditForm({ category }: PageProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, processing, errors } = useForm({
        name: category.name,
        image_url: null,
        _image_url_current: category.image_url,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: Record<string, any> = {
            _method: 'put',
            name: data.name,
        };

        if (data.image_url) {
            payload.image_url = data.image_url;
        } else if (data._image_url_current) {
            payload._image_url_current = data._image_url_current;
        }

        router.post(`/categories/${category.id}`, payload, {
            forceFormData: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {/* Display error */}
                {Object.keys(errors).length > 0 && (
                    <Alert>
                        <AlertCircleIcon />
                        <AlertTitle>Errors!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(
                                    ([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ),
                                )}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleUpdate} encType="multipart/form-data">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Make changes to your category here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="category name">Name</Label>
                            <Input
                                placeholder="category Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            ></Input>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="editImageCategory">Image</Label>
                            <Input
                                type="file"
                                id="editImageCategory"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'image_url',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={processing} type="submit">
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
