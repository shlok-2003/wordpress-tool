import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { productSchema } from "@/types";

export default function ProductForm() {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            productShortDescription: "",
            whatIsIncluded: "",
            productType: "simple",
            downloadable: true,
            virtual: true,
            soldIndividually: true,
            regularPrice: "",
            salePrice: "",
            seoTitle: "",
            metaDescription: "",
            url: "",
            productTags: "",
        },
    });

    function onSubmit(values: z.infer<typeof productSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col pb-3"
            >
                <div className="flex flex-row flex-wrap justify-center gap-5">
                    <div className="flex-1 shadow-[0_3px_8px_0_rgba(0,0,0,0.16)] p-5 flex flex-col gap-2">
                        <div className="flex flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="productType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Type</FormLabel>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Select Product Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="simple">
                                                    Simple
                                                </SelectItem>
                                                <SelectItem value="variable">
                                                    Variable
                                                </SelectItem>
                                                <SelectItem value="grouped">
                                                    Grouped
                                                </SelectItem>
                                                <SelectItem value="external">
                                                    External
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-row justify-between items-center flex-1">
                                <FormField
                                    control={form.control}
                                    name="downloadable"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-base">
                                                    Downloadable
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="virtual"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-base">
                                                    Virtual
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="soldIndividually"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-base">
                                                    Sold Individually
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2">
                            <Controller
                                name="productDescription"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="quill-wrapper">
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500 dark:text-red-900"
                                                    : ""
                                            }
                                        >
                                            Product Description
                                        </FormLabel>
                                        <ReactQuill
                                            {...field}
                                            theme="snow"
                                            value={field.value || ""}
                                            onChange={(text) =>
                                                field.onChange(text)
                                            }
                                        />
                                        {fieldState.error && (
                                            <div className="text-[0.8rem] font-medium text-red-500 dark:text-red-900">
                                                {fieldState.error.message}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Controller
                                name="productShortDescription"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="quill-wrapper">
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500 dark:text-red-900"
                                                    : ""
                                            }
                                        >
                                            Product Short Description
                                        </FormLabel>
                                        <ReactQuill
                                            {...field}
                                            theme="snow"
                                            value={field.value || ""}
                                            onChange={(text) =>
                                                field.onChange(text)
                                            }
                                        />
                                        {fieldState.error && (
                                            <div className="text-[0.8rem] font-medium text-red-500 dark:text-red-900">
                                                {fieldState.error.message}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex-1 shadow-[0_3px_8px_0_rgba(0,0,0,0.16)] p-5 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Controller
                                name="whatIsIncluded"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="quill-wrapper">
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500 dark:text-red-900"
                                                    : ""
                                            }
                                        >
                                            What's Included
                                        </FormLabel>
                                        <ReactQuill
                                            {...field}
                                            theme="snow"
                                            value={field.value || ""}
                                            onChange={(text) =>
                                                field.onChange(text)
                                            }
                                        />
                                        {fieldState.error && (
                                            <div className="text-[0.8rem] font-medium text-red-500 dark:text-red-900">
                                                {fieldState.error.message}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="regularPrice"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Regular Price"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="salePrice"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Sale Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Sale Price"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="seoTitle"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>SEO Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="SEO Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Meta Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Meta Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="productTags"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Product Tags</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product Tags"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit" className="self-end w-40">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
