"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet
    .withRule(
        detectBot({
            mode: "LIVE",
            allow: [],
        })
    )
    .withRule(
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 5,
        })
    );

export async function CreateCourse(
    data: CourseSchemaType
): Promise<ApiResponse> {
    const session = await requireAdmin();

    try {
        const req = await request();

        const decision = await aj.protect(req, {
            fingerprint: session.user.id,
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: "error",
                    message: "Too many requests. Please try again later.",
                };
            }

            return {
                status: "error",
                message: "Access denied. Bot activity detected.",
            };
        }

        const validation = courseSchema.safeParse(data);

        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid course data. Please review the form inputs.",
            };
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session.user.id,
            },
        });

        return {
            status: "success",
            message: "Course created successfully.",
        };
    } catch (error) {
        console.error("CreateCourse error:", error);
        return {
            status: "error",
            message: "An unexpected error occurred while creating the course.",
        };
    }
}
