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
import { OrderData } from "@/components/orderCard";
import { Suspense } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

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
        <div
          className={cn(
            "scale-[0.8] aspect-[1.59] mt-12 mr-4 mb-8 z-50 relative",
            "flex items-start justify-start",
            "rounded-xl border border-white/80 shadow-[0_8px_16px_rgba(0,0,0,0.3)]",
            "w-[80%]"
          )}
          style={{
            backgroundColor: cardColor,
          }}
        >
          <div className="absolute top-4 left-4 flex flex-col gap-2 animate-fade-in">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="absolute top-4 right-4 animate-fade-in">
            <Image
              src="/nfc.png"
              alt="nfc"
              width={24}
              height={24}
              className="animate-fade-in"
            />
          </div>

          {/* Clickable balance section with token selector */}
          <div className="absolute bottom-4 right-4 flex items-center justify-center text-white space-x-2 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="community logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <Skeleton className="w-24 h-4" />
              <div className="w-[4px]" />
            </div>
          </div>
        </div>
        <Flex
          justify="center"
          gap="8"
          className={cn(
            "w-full  max-w-5xl items-center justify-between text-sm",
            "pt-4 pr-4"
          )}
        >
          <Skeleton className="w-24 h-24 rounded-full" />
        </Flex>
        <Flex
          justify="center"
          direction="column"
          gap="2"
          className={cn(
            "w-full  max-w-5xl items-center justify-between text-sm",
            "pt-8 pr-4"
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

  return (
    <>
      <CardReadOnly
        config={config}
        serialNumber={serialNumber}
        project={project ?? community}
        initialCardColor={cardColor}
        accountAddress={address}
        tokenAddress={tokenAddress}
        initialProfile={profile ?? undefined}
        initialBalance={formattedBalance}
      />
    </>
  );
}
