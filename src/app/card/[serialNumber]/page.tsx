import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import CardReadOnly from "@/containers/wallet/card-readonly";
import {
  CommunityConfig,
  getAccountBalance,
  getCardAddress,
  getProfileFromAddress,
} from "@citizenwallet/sdk";
import { formatUnits, id } from "ethers";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";
import { TokenMappingOverrides } from "@/components/wallet/tokenMappingOverrides";
import { Suspense } from "react";
import { Flex } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getCard } from "@/services/pay/cards";
import { redirect } from "next/navigation";
import SkeletonCard from "@/components/wallet/skeleton-card";
import { getNavigationLink } from "@/utils/navigation-links";
import { getTransactions } from "@/services/pay/transactions";

interface PageProps {
  params: Promise<{
    serialNumber: string;
  }>;
  searchParams: Promise<{
    project?: string;
    community?: string; // mistake when ordering cards, it is = project
    token?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const headersList = await headers();

  const { project, community, token } = await props.searchParams;

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  return (
    <Suspense
      fallback={
        <Fallback cardColor={cardColor} logo={communityConfig.community.logo} />
      }
    >
      <AsyncPage {...props} />
    </Suspense>
  );
}

function Fallback({ cardColor, logo }: { cardColor: string; logo: string }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col align-center p-4 max-w-xl">
      <Flex
        direction="column"
        className="fixed z-50 top-0 bg-transparent-to-white-90 w-full max-w-xl items-center justify-between text-sm pr-4 pb-10"
      >
        <SkeletonCard
          cardColor={cardColor}
          logo={logo}
          className="mt-12 mb-8"
        />
        <Flex
          justify="center"
          direction="column"
          gap="2"
          className={cn(
            "w-full  max-w-5xl items-center justify-between text-sm",
            "pt-8 px-16"
          )}
        >
          <Skeleton className="w-full h-24 rounded-lg" />
          <Skeleton className="w-full h-24 rounded-lg" />
        </Flex>
      </Flex>
    </main>
  );
}

async function AsyncPage(props: PageProps) {
  const headersList = await headers();

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const { serialNumber } = await props.params;
  const { project, community, token } = await props.searchParams;

  const tokenConfig = communityConfig.getToken(token);

  const address = await getCardAddress(communityConfig, id(serialNumber));
  if (!address) {
    return <div>Card not found</div>;
  }

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  const tokenAddress =
    token ?? TokenMappingOverrides[project ?? community ?? "smile"];

  const ipfsDomain = process.env.NEXT_PUBLIC_IPFS_DOMAIN;
  if (!ipfsDomain) {
    throw new Error("NEXT_PUBLIC_IPFS_DOMAIN is not set");
  }

  const profile = await getProfileFromAddress(
    ipfsDomain,
    communityConfig,
    address
  );

  const balance = await getAccountBalance(communityConfig, address, {
    tokenAddress,
  });

  let formattedBalance = formatUnits(balance ?? 0n, tokenConfig.decimals);
  if (tokenConfig.decimals === 0) {
    formattedBalance = parseInt(formattedBalance).toFixed(0);
  } else {
    formattedBalance = parseFloat(formattedBalance).toFixed(2);
  }

  const { status, card } = await getCard(serialNumber);

  if ((status !== 404 && status !== 200) || (card && card.owner !== null)) {
    redirect(
      getNavigationLink(serialNumber, {
        project,
        community,
        token,
        path: "/pin",
      })
    );
  }

  const { transactions } = await getTransactions(address, tokenAddress, 10, 0);

  return (
    <CardReadOnly
      config={config}
      serialNumber={serialNumber}
      project={project ?? community}
      initialCardColor={cardColor}
      accountAddress={address}
      initialTransactions={transactions}
      tokenAddress={tokenAddress}
      initialProfile={profile ?? undefined}
      initialBalance={formattedBalance}
    />
  );
}
