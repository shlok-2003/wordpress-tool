import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { attributeSchema, termSchema } from "@/types";
import { Attribute } from "@/pages/add-attribute";

import {
    addAttribute,
    addTerm,
    editAttribute,
    deleteTerm,
    deleteAttribute,
} from "@/redux/slices/attributeSlice";

export function AddAttributeForm() {
    const dispatch = useDispatch<AppDispatch>();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const form = useForm<z.infer<typeof attributeSchema>>({
        resolver: zodResolver(attributeSchema),
        defaultValues: {
            name: "",
            slug: "",
        },
    });

    function onSubmit(values: z.infer<typeof attributeSchema>) {
        console.log(values);

        const newAttribute: Attribute = {
            id: Math.floor(Math.random() * 1000),
            name: values.name,
            slug: values.slug,
            terms: [],
        };

        dispatch(addAttribute(newAttribute));

        form.reset();
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="mb-4 self-start"
                    onClick={() => setIsOpen(true)}
                >
                    Add New Attribute
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Attribute Details</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Attribute Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Attribute Slug"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Button type="submit">Submit</Button>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

interface IEditAttributeFormProps {
    attribute: Attribute;
}

export function EditAttributeForm({ attribute }: IEditAttributeFormProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const form = useForm<z.infer<typeof attributeSchema>>({
        resolver: zodResolver(attributeSchema),
        defaultValues: {
            name: attribute.name,
            slug: attribute.slug,
        },
    });

    function onSubmit(values: z.infer<typeof attributeSchema>) {
        console.log(values);

        const updatedAttribute: Attribute = {
            ...attribute,
            name: values.name,
            slug: values.slug,
        };

        dispatch(editAttribute(updatedAttribute));

        form.reset();
        setIsOpen(false);
    }

    function handleDelete(id: number) {
        dispatch(deleteAttribute(id));
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="mb-4 self-start"
                    onClick={() => setIsOpen(true)}
                >
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Attribute</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Attribute Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Attribute Slug"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Button type="submit">Submit</Button>

                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(attribute.id)}
                            >
                                Delete
                            </Button>

                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

interface IConfigAttrTerms {
    id: number;
    terms: string[];
}

export function ConfigureAttributeTermsForm({ id, terms }: IConfigAttrTerms) {
    const dispatch = useDispatch<AppDispatch>();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const form = useForm<z.infer<typeof termSchema>>({
        resolver: zodResolver(termSchema),
        defaultValues: {
            term: "",
        },
    });

    function onSubmit(values: z.infer<typeof termSchema>) {
        console.log(values);

        const newTerm = {
            id: id,
            term: values.term,
        };

        dispatch(addTerm(newTerm));
        form.reset();
    }

    function toDeleteTerm(term: string) {
        const deletedTerm = {
            id: id,
            term: term,
        };

        dispatch(deleteTerm(deletedTerm));
        console.log(term);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Configure Terms</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Configure Terms</DialogTitle>
                </DialogHeader>

                {terms.length > 0 &&
                    terms.map((term, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center"
                        >
                            {term}
                            <Button
                                variant="ghost"
                                className="text-red-500"
                                onClick={() => toDeleteTerm(term)}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="term"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Add New Term</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Button type="submit">Submit</Button>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
