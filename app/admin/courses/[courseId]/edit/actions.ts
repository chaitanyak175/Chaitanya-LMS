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

export async function editCourse(
    data: CourseSchemaType,
    courseId: string
): Promise<ApiResponse> {
    const user = await requireAdmin();

    try {
        const req = await request();

        const decision = await aj.protect(req, {
            fingerprint: user.user.id,
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

        const result = courseSchema.safeParse(data);

        if (!result.success) {
            return {
                status: "error",
                message: "Invalid course data. Please check your input.",
            };
        }

        await prisma.course.update({
            where: {
                id: courseId,
                userId: user.user.id,
            },
            data: {
                ...result.data,
            },
        });

        return {
            status: "success",
            message: "Course updated successfully.",
        };
    } catch (error) {
        console.error("EditCourse error:", error);
        return {
            status: "error",
            message: "An error occurred while updating the course.",
        };
    }
}
