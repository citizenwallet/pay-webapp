import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { Suspense } from "react";
import Details from "./details";
import OrderDetailFallback from "./fallback";
import { getOrdersByTxHash } from "@/services/pay/orders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@radix-ui/themes";
import {
  CommunityConfig,
  getCardAddress,
  getProfileFromAddress,
  getProfileFromUsername,
} from "@citizenwallet/sdk";
import { getTransaction } from "@/services/pay/transactions";
import { id } from "ethers";
import { t } from "@/lib/i18n";
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    serialNumber: string;
    hash: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const { hash, serialNumber } = params;

  return (
    <Suspense fallback={<OrderDetailFallback />}>
      <AsyncPage hash={hash} serialNumber={serialNumber} />
    </Suspense>
  );
}

async function AsyncPage({
  hash,
  serialNumber,
}: {
  hash: string;
  serialNumber: string;
}) {
  const transaction = await getTransaction(hash);
  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  if (!transaction) {
    return (
      <div className="relative flex min-h-screen w-full flex-col align-center p-4 max-w-xl">
        <div className="mb-6">
          <Link
            href={"/"}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back_to_transactions")}
          </Link>
        </div>
        <Card className="shadow-lg border-0">
          <CardContent className="p-8 text-center">
            <Text size="4" className="text-gray-600">
              {t("order_not_found")}
            </Text>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [order] = await getOrdersByTxHash(hash);

  const formattedOrderDate = new Date(
    transaction.created_at
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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

  const cardAddress = await getCardAddress(communityConfig, id(serialNumber));
  if (!cardAddress) {
    return <div>Card not found</div>;
  }

  const profile = await getProfileFromAddress(
    ipfsDomain,
    communityConfig,
    cardAddress.toLowerCase() === transaction.to.toLowerCase()
      ? transaction.from
      : transaction.to
  );

  const token = communityConfig.getToken(transaction.contract);
  const tokenLogo = token?.logo;

  return (
    <Details
      tokenLogo={tokenLogo ?? "/coin.png"}
      transaction={transaction}
      order={order ?? undefined}
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
