import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";

export const fileUploadSchema = z.object({
    fileName: z.string().min(1, { message: "Filename is required." }),
    contentType: z.string().min(1, { message: "Content type is required." }),
    size: z.number().min(1, { message: "Size is required" }),
    isImageBoolean: z.boolean(),
});

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

export async function POST(request: Request) {
    const session = await requireAdmin();

    try {
        const decision = await aj.protect(request, {
            fingerprint: session?.user.id ?? "anonymous",
        });

        if (decision.isDenied()) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const validation = fileUploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Invalid request body",
                    issues: validation.error.format(),
                },
                { status: 400 }
            );
        }

        const { fileName, contentType, size } = validation.data;
        const uniqueKey = `${uuidv4()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: env.NEXT_PUBLIC_S3_NAME_IMAGES,
            ContentType: contentType,
            ContentLength: size,
            Key: uniqueKey,
        });

        const presignedUrl = await getSignedUrl(S3, command, {
            expiresIn: 360, // URL expires in 6 minutes
        });

        const response = {
            presignedUrl,
            key: uniqueKey,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Presigned URL generation failed:", error);
        return NextResponse.json(
            { error: "Failed to generate presigned URL." },
            { status: 500 }
        );
    }
}
