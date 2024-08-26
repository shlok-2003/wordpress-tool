import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddCategoryForm } from "@/components/forms/category-form";
import { Button } from "@/components/ui/button";

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent: string | "None";
}

export default function AddCategory() {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: "Uncategorised", slug: "Uncategorised", parent: "None" },
    ]);

    useEffect(() => {
        setCategories([]);
    }, []);

    return (
        <main className="px-10 flex flex-col justify-center items-center pt-10 space-y-4">
            <h2 className="text-2xl font-bold self-start">
                Category Management
            </h2>

            <AddCategoryForm categories={categories} />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length > 0 &&
                        categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell>
                                    {/* {renderCategoryHierarchy(cat)} */}
                                </TableCell>
                                <TableCell>{cat.slug}</TableCell>
                                <TableCell>
                                    <div>
                                        {/* <EditCategoryForm /> */}

                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </main>
    );
}
