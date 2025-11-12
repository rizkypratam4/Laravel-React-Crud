import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: index().url,
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps extends InertiaPageProps {
    flash: {
        message?: string;
    };
    products: Product[];
}

export default function Index() {
    const { products, flash } = usePage<PageProps>().props;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}?`)) {
            destroy(`products/${id}`);
        }
    };
    const getlink = (id: number) => {
        return `/products/${id}/edit`;
    };

    return (
        // https://dribbble.com/shots/25143229-Sales-Management-Dashboard-Product-List
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-6 flex items-center justify-between">
                <h1 className="text-bold self-center text-2xl">Product List</h1>
                <div className="flex gap-3">
                    <Button size="sm">Import</Button>
                    <Button size="sm">Export</Button>
                    <Link href="products/create">
                        <Button
                            size="sm"
                            className="bg-sky-800 text-white hover:bg-sky-900"
                        >
                            + Add Product
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    {flash.message && (
                        <Alert>
                            <CheckCircle2Icon />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            <Card className="mx-6">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex-col gap-2"></CardFooter>
            </Card>
            {products.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>
                            A list of your recent products.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {product.id}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link
                                            href={getlink(
                                                product.id,
                                            ).toString()}
                                        >
                                            <Button className="bg-slate-600 hover:bg-slate-700">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() =>
                                                handleDelete(
                                                    product.id,
                                                    product.name,
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
