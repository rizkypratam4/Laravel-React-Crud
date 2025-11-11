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
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/categories';
import { type BreadcrumbItem } from '@/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: index().url,
    },
];

interface Category {
    id: number;
    name: string;
    price: number;
    description: string;
}

export interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    };
    categories: Category[];
}

export default function Index() {
    const { categories, flash } = usePage<PageProps>().props;
    const { processing, delete: destroy } = useForm();
    const { data, setData, post, reset, errors } = useForm({
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

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}?`)) {
            destroy(`products/${id}`);
        }
    };
    const getlink = (id: number) => {
        return `/categories/${id}/edit`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="categorys" />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {Object.keys(errors).length > 0 ? (
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
                ) : (
                    <div className="m-4">
                        {flash.message && (
                            <Alert>
                                <CheckCircle2Icon />
                                <AlertTitle>Notification!</AlertTitle>
                                <AlertDescription>
                                    {flash.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}
                <Card className="mx-4">
                    <CardHeader>
                        <CardTitle>Create Category</CardTitle>
                        <CardDescription>
                            input your category here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Name</Label>
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

            {categories.length > 0 && (
                <div className="mx-4 my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Card
                            key={category.id}
                            className="flex flex-col items-center p-4 shadow"
                        >
                            <img
                                src={`/storage/${category.image_url}`}
                                alt={category.name}
                                className="h-32 w-full rounded-md object-cover"
                            />

                            <h3 className="mt-3 font-semibold">
                                {category.name}
                            </h3>

                            <div className="mt-4 flex gap-2">
                                <Link href={getlink(category.id).toString()}>
                                    <Button
                                        size="sm"
                                        className="bg-slate-600 hover:bg-slate-700"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    disabled={processing}
                                    onClick={() =>
                                        handleDelete(category.id, category.name)
                                    }
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
