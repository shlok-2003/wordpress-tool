import { z } from "zod";

export const productSchema = z.object({
    productName: z.string().min(2, {
        message: "Product Name must be at least 2 characters.",
    }),
    productDescription: z.string().min(2, {
        message: "Product Description must be at least 2 characters.",
    }),
    productShortDescription: z.string().min(2, {
        message: "Product Short Description must be at least 2 characters.",
    }),
    whatIsIncluded: z.string().min(2, {
        message: "What is Included must be at least 2 characters.",
    }),
    productType: z.enum(["simple", "variable", "grouped", "external"]),
    downloadable: z.boolean(),
    virtual: z.boolean(),
    soldIndividually: z.boolean(),
    regularPrice: z.string().min(2, {
        message: "Regular Price must be at least 2 characters.",
    }),
    salePrice: z.string().min(2, {
        message: "Sale Price must be at least 2 characters.",
    }),
    seoTitle: z.string().min(2, {
        message: "SEO Title must be at least 2 characters.",
    }),
    metaDescription: z.string().min(2, {
        message: "Meta Description must be at least 2 characters.",
    }),
    url: z.string().min(2, {
        message: "URL must be at least 2 characters.",
    }),
    productTags: z.string().min(2, {
        message: "Product Tags must be at least 2 characters.",
    }),
});

export const userSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        confirm_password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: "Passwords do not match.",
    })
    .refine((data) => data.username !== "admin", {
        path: ["username"],
        message: "Username cannot be 'admin'.",
    });

export const editUserSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        new_password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })
    .refine((data) => data.password !== data.new_password, {
        path: ["new_password"],
        message: "New password cannot be the same as the old password.",
    });

export const attributeSchema = z.object({
    name: z.string().min(2, {
        message: "Attribute Name must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "Slug must be at least 2 characters.",
    }),
});

export const termSchema = z.object({
    term: z.string().min(2, {
        message: "Term Name must be at least 2 characters.",
    }),
});

export const categorySchema = z.object({
    name: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "Slug must be at least 2 characters.",
    }),
    parent: z.string().min(2, {
        message: "Parent must be at least 2 characters.",
    }),
});
