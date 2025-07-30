import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { Suspense } from "react";
import OrderDetailPage from "./OrderDetailPage";
import OrderDetailFallback from "./fallback";
export const dynamic = "force-dynamic";



interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page(props: PageProps) {
    const headersList = await headers();

    const config = await getCommunityFromHeaders(headersList);
    if (!config) {
        return <div>Community not found</div>;
    }

    const params = await props.params;

    const { id } = params;

    return (
        <Suspense fallback={<OrderDetailFallback />}>
            <AsyncPage id={id} />
        </Suspense>
    );
}

async function AsyncPage({
    id
}: {
    id: string;
}) {
    return (
        <OrderDetailPage orderId={id} />
    )
}
