import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/categories';
import { Category, type BreadcrumbItem } from '@/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

import { Head, useForm, usePage } from '@inertiajs/react';
import CreateForm from './CreateForm';
import EditForm from './EditForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: index().url,
    },
];

export interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    };
    categories: Category[];
}

export default function Index() {
    const { categories } = usePage<PageProps>().props;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}?`)) {
            destroy(`categories/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="categorys" />
            <CreateForm />
            {categories.length > 0 && (
                <div className="mx-4 my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Card
                            key={category.id}
                            className="flex flex-col items-center p-4 shadow"
                        >
                            <img
                                src={`/storage/${category.image_url ?? ''}`}
                                alt={category.name}
                                loading="lazy"
                                className="h-32 w-full rounded-md object-cover"
                            />

                            <h3 className="mt-3 font-semibold">
                                {category.name}
                            </h3>

                            <div className="mt-4 flex gap-2">
                                <EditForm
                                    category={category}
                                    key={category.id}
                                />{' '}
                                <Button
                                    variant="outline"
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
