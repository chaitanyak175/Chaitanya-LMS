"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
    RenderEmptyState,
    RenderErrorState,
    RenderUploadedState,
    RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
    id: string | null;
    file: File | null;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
    fileType: "image" | "video";
}

interface iAppProps {
    value?: string;
    onChange?: (value: string) => void;
}

export function Uploader({ value, onChange }: iAppProps) {
    const [fileState, setFileState] = useState<UploaderState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        fileType: "image",
        key: value,
    });

    async function uploadFile(file: File) {
        setFileState((currentSelectedFile) => ({
            ...currentSelectedFile,
            uploading: true,
            progress: 0,
        }));

        try {
            // 1. Get presigned URL
            const presignedResponse = await fetch("/api/s3/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImageBoolean: true,
                }),
            });

            if (!presignedResponse.ok) {
                toast.error("Failed to get presigned URL.");

                setFileState((currentSelectedFile) => ({
                    ...currentSelectedFile,
                    uploading: false,
                    progress: 0,
                    error: true,
                }));
                return;
            }

            const { presignedUrl, key } = await presignedResponse.json();

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentageCompleted =
                            (event.loaded / event.total) * 100;
                        setFileState((currentSelectedFile) => ({
                            ...currentSelectedFile,
                            progress: Math.round(percentageCompleted),
                        }));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        setFileState((currentSelectedFile) => ({
                            ...currentSelectedFile,
                            progress: 100,
                            uploading: false,
                            key: key,
                        }));

                        onChange?.(key);

                        toast.success("File uploaded successfully");

                        resolve();
                    } else {
                        reject(new Error("Upload Failed"));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error("Upload Failed"));
                };

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });
        } catch {
            toast.error("Something went wrong");

            setFileState((currentSelectedFile) => ({
                ...currentSelectedFile,
                progress: 0,
                error: true,
                uploading: false,
            }));
        }
    }

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];

                if (
                    fileState.objectUrl &&
                    !fileState.objectUrl.startsWith("http")
                ) {
                    URL.revokeObjectURL(fileState.objectUrl);
                }
                setFileState({
                    file: file,
                    uploading: false,
                    progress: 0,
                    objectUrl: URL.createObjectURL(file),
                    error: false,
                    id: uuidv4(),
                    isDeleting: false,
                    fileType: "image",
                });

                uploadFile(file);
            }
        },
        [fileState.objectUrl]
    );

    async function handleRemoveFile() {
        if (fileState.isDeleting || !fileState.objectUrl) return;

        try {
            setFileState((currentSelectedFile) => ({
                ...currentSelectedFile,
                isDeleting: true,
            }));

            const response = await fetch("/api/s3/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: fileState.key,
                }),
            });

            if (!response.ok) {
                toast.error("Failed to remove file from storage ");
                setFileState((currentSelectedFile) => ({
                    ...currentSelectedFile,
                    isDeleting: false,
                    error: true,
                }));

                return;
            }

            if (
                fileState.objectUrl &&
                !fileState.objectUrl.startsWith("http")
            ) {
                URL.revokeObjectURL(fileState.objectUrl);
            }

            onChange?.("");

            setFileState(() => ({
                file: null,
                uploading: false,
                progress: 0,
                objectUrl: undefined,
                error: false,
                fileType: "image",
                id: null,
                isDeleting: false,
                key: undefined,
            }));

            toast.success("File removed successfully");
        } catch (error) {
            toast.error("Error removing file. Please try again");

            setFileState((currentSelectedFile) => ({
                ...currentSelectedFile,
                isDeleting: false,
                error: true,
            }));
        }
    }

    function rejectionFiles(fileRejection: FileRejection[]) {
        if (fileRejection.length) {
            const tooManyFiles = fileRejection.find(
                (rejection) => rejection.errors[0].code === "too-many-files"
            );

            const fileSizeTooBig = fileRejection.find(
                (rejection) => rejection.errors[0].code === "file-too-large"
            );

            if (fileSizeTooBig) {
                toast.error(
                    "The selected file is too large. Maximum size is 5MB."
                );
            }

            if (tooManyFiles) {
                toast.error("You can only upload one file at a time.");
            }
        }
    }

    function renderContent() {
        if (fileState.uploading) {
            return (
                <RenderUploadingState
                    file={fileState.file as File}
                    progress={fileState.progress}
                />
            );
        }

        if (fileState.error) {
            return <RenderErrorState />;
        }

        if (fileState.objectUrl) {
            return (
                <RenderUploadedState
                    handleRemoveFile={handleRemoveFile}
                    previewUrl={fileState.objectUrl}
                    isDeleting={fileState.isDeleting}
                />
            );
        }

        return <RenderEmptyState isDragActive={isDragActive} />;
    }

    useEffect(() => {
        return () => {
            if (
                fileState.objectUrl &&
                !fileState.objectUrl.startsWith("http")
            ) {
                URL.revokeObjectURL(fileState.objectUrl);
            }
        };
    }, [fileState.objectUrl]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
        multiple: false,
        maxSize: 5 * 1024 * 1024, // 5 mb Calculation
        onDropRejected: rejectionFiles,
        disabled: fileState.uploading || !!fileState.objectUrl,
    });

    return (
        <Card
            {...getRootProps()}
            className={cn(
                "relative border-2 border-dashed transition-colors duration-100 w-full h-64",
                isDragActive
                    ? "border-primary bg-primary/10 border-solid"
                    : "border-border hover:border-primary"
            )}
        >
            <CardContent className="flex items-center justify-center h-full w-full p-4">
                <input {...getInputProps()} />
                {renderContent()}
            </CardContent>
        </Card>
    );
}
