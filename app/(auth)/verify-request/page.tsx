// app/(auth)/verify-request/page.tsx
import dynamic from "next/dynamic";

const VerifyRequestClient = dynamic(() => import("./verify-request-client"), {
    ssr: false,
});

export default function VerifyRequestPage() {
    return <VerifyRequestClient />;
}
