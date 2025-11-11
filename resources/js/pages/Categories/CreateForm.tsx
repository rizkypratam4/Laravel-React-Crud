import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { useRef } from 'react';

export interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    };
    categories: Category[];
}

const CreateForm = () => {
    const { flash } = usePage<PageProps>().props;
    const {
        data,
        setData,
        post,
        reset,
        errors,
        processing,
    } = useForm({
        name: '',
        image_url: null as File | null,
    });
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/categories', {
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
            forceFormData: true,
        });
    };
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {Object.keys(errors).length > 0 ? (
                <Alert>
                    <AlertCircleIcon />
                    <AlertTitle>Errors!</AlertTitle>
                    <AlertDescription>
                        <ul>
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key}>{message as string}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="m-4">
                    {flash.message && (
                        <Alert>
                            <CheckCircle2Icon />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            )}
            <Card className="mx-4">
                <CardHeader>
                    <CardTitle>Create Category</CardTitle>
                    <CardDescription>input your category here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="grid gap-3">
                            <Label htmlFor="nameCategory">Name</Label>
                            <Input
                                id="nameCategory"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="input category name"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="imageCategory">Image</Label>
                            <Input
                                ref={fileInputRef}
                                id="imageCategory"
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        'image_url',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                                required
                            />
                        </div>
                    </div>
                    <Button
                        size="sm"
                        disabled={processing}
                        type="submit"
                        className="mt-5"
                    >
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
};

export default CreateForm;
