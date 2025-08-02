import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { Suspense } from "react";
import OrderDetailPage from "./OrderDetailPage";
import OrderDetailFallback from "./fallback";
import { getOrderById } from "@/services/orders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@radix-ui/themes";
import { CommunityConfig, getProfileFromUsername } from "@citizenwallet/sdk";
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

async function AsyncPage({ id }: { id: string }) {
  const order = await getOrderById(id);
  if (!order) {
    return (
      <div className="relative flex min-h-screen w-full flex-col align-center p-4 max-w-xl">
        <div className="mb-6">
          <Link
            href={"/"}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </div>
        <Card className="shadow-lg border-0">
          <CardContent className="p-8 text-center">
            <Text size="4" className="text-gray-600">
              Order not found. Please go back and select an order from the list.
            </Text>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formattedOrderDate = new Date(order.created_at).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const headersList = await headers();

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const ipfsDomain = process.env.NEXT_PUBLIC_IPFS_DOMAIN;
  if (!ipfsDomain) {
    throw new Error("NEXT_PUBLIC_IPFS_DOMAIN is not set");
  }

  const profile = await getProfileFromUsername(
    ipfsDomain,
    communityConfig,
    order.place.slug
  );

  const token = communityConfig.getToken(order.token);
  const tokenLogo = token?.logo;

  return (
    <OrderDetailPage
      tokenLogo={tokenLogo ?? "/coin.png"}
      order={order}
      profile={
        profile ?? {
          account: "",
          description: "",
          image: "/shop.png",
          image_medium: "/shop.png",
          image_small: "/shop.png",
          name: "Anonymous",
          username: "@anonymous",
        }
      }
      orderDate={formattedOrderDate}
    />
  );
}
