// app/(auth)/verify-request/page.tsx
import VerifyRequestClient from "./verify-request-client";

export const dynamic = "force-dynamic"; // prevent static rendering

export default function VerifyRequestPage() {
    return <VerifyRequestClient />;
}
