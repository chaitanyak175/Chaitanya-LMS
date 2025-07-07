import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategory = [
    "Development",
    "Business",
    "Finance",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Health & Fitness",
    "Music",
    "Teaching & Academics",
] as const;

export const courseSchema = z.object({
    title: z
        .string()
        .min(3, {
            message: "Title must be at least 3 characters.",
        })
        .max(100, {
            message: "Title must not exceed 100 characters.",
        }),

    description: z.string().min(3, {
        message: "Description must be at least 3 characters.",
    }),

    fileKey: z.string().min(1, {
        message: "File is required.",
    }),

    price: z.coerce.number().min(1, {
        message: "Price must be at least $1.",
    }),

    duration: z.coerce
        .number()
        .min(1, {
            message: "Duration must be at least 1 minute.",
        })
        .max(500, {
            message: "Duration must not exceed 500 minutes.",
        }),

    level: z.enum(courseLevels, {
        errorMap: () => ({ message: "Please select a valid course level." }),
    }),

    category: z.enum(courseCategory, {
        message: "Category is required",
    }),

    smallDescription: z
        .string()
        .min(100, {
            message: "Small description must be at least 100 characters.",
        })
        .max(200, {
            message: "Small description must not exceed 200 characters.",
        }),

    slug: z.string().min(3, {
        message: "Slug must be at least 3 characters.",
    }),

    status: z.enum(courseStatus, {
        errorMap: () => ({ message: "Please select a valid status." }),
    }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
