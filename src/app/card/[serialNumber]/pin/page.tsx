import { Card, CardContent } from "@/components/ui/card";
import { Shield, LockIcon, PlusIcon } from "lucide-react";
import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import {
  CommunityConfig,
  ConfigPlugin,
  getCardAddress,
  getProfileFromAddress,
  Profile,
} from "@citizenwallet/sdk";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";
import { Colors, getColors } from "@/utils/colors";
import Image from "next/image";
import NFCCard from "@/components/wallet/card";
import { id } from "ethers";
import { Suspense } from "react";
import SkeletonCard from "@/components/wallet/skeleton-card";
import { getCard } from "@/services/pay/cards";
import SetupCardButton from "@/components/wallet/setup-card-button";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { getNavigationLink } from "@/utils/navigation-links";
import { tServer, getLanguageFromHeaders, Language } from "@/lib/i18n";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    serialNumber: string;
  }>;
  searchParams: Promise<{
    project?: string;
    community?: string;
    token?: string;
    lang?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const headersList = await headers();
  const language = getLanguageFromHeaders(headersList);

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const { project, community, token } = await props.searchParams;

  const tokenConfig = communityConfig.getToken(token);

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  const colors = getColors(cardColor);

  return (
    <Suspense
      fallback={
        <Fallback
          cardColor={cardColor}
          logo={tokenConfig.logo}
          colors={colors}
          language={language}
        />
      }
    >
      <SecuredCardPage {...props} language={language} />
    </Suspense>
  );
}

function Fallback({
  cardColor,
  logo,
  colors,
  language,
}: {
  cardColor: string;
  logo?: string;
  colors: Colors;
  language: Language;
}) {
  return (
    <div
      className="min-h-screen w-full max-w-md mx-auto"
      style={{
        backgroundColor: colors.light,
      }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: colors.light }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="coin"
                  width={24}
                  height={24}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              <h1 className="text-xl font-bold" style={{ color: colors.text }}>
                {tServer("brussels_pay", language)}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Success Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.primary }}
          >
            <LockIcon className="w-10 h-10 text-white" />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            {tServer("card", language)}
          </h2>
        </div>

        {/* Card Display */}
        <div className="flex justify-center items-center">
          <SkeletonCard
            cardColor={cardColor}
            logo={logo}
            className="mt-2 mb-8"
          />
        </div>

        {/* Card Info */}
        <Card
          className="max-w-md mx-auto mb-6"
          style={{ borderColor: colors.light }}
        >
          <CardContent className="p-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text }}
            >
              {tServer("card_information", language)}
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("project", language)}
                </span>
                <Skeleton className="w-24 h-4" />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("card_type", language)}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.text }}
                >
                  {tServer("brussels_pay_nfc", language)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("serial_number", language)}
                </span>
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col items-center max-w-md mx-auto space-y-3">
          <p
            className="text-sm text-center"
            style={{ color: colors.textLight }}
          >
            {tServer("is_this_your_card", language)}
          </p>
          <Skeleton className="w-2/3 h-10" />
        </div>

        {/* Info Section */}
        <div className="max-w-md mx-auto mt-8">
          <Card className="bg-blue-50" style={{ borderColor: colors.light }}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">ℹ</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    {tServer("using_your_secured_card", language)}
                  </p>
                  <p className="text-xs text-blue-700">
                    {tServer("using_your_secured_card_description", language)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-white border-t mt-12"
        style={{ borderColor: colors.light }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: colors.textLight }}>
              {tServer("brussels_pay", language)}
            </p>
            <p className="text-xs" style={{ color: colors.primary }}>
              {tServer(
                "supporting_our_community_through_local_payments",
                language
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

async function SecuredCardPage(props: PageProps & { language: Language }) {
  const headersList = await headers();

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const { serialNumber } = await props.params;

  const cardAddress = await getCardAddress(communityConfig, id(serialNumber));
  if (!cardAddress) {
    return <div>Card not found</div>;
  }

  const ipfsDomain = process.env.NEXT_PUBLIC_IPFS_DOMAIN;
  if (!ipfsDomain) {
    throw new Error("NEXT_PUBLIC_IPFS_DOMAIN is not set");
  }

  const profile = await getProfileFromAddress(
    ipfsDomain,
    communityConfig,
    cardAddress
  );

  const { project, community, token } = await props.searchParams;

  const tokenConfig = communityConfig.getToken(token);

  const topUpPlugin = communityConfig.getActionPlugin(
    "topup",
    tokenConfig.address,
    tokenConfig.chain_id
  );

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  const colors = getColors(cardColor);

  const { card, challenge, status } = await getCard(serialNumber);
  if (!card && status === 404) {
    redirect(
      getNavigationLink(serialNumber, {
        project,
        community,
        token,
        path: "/setup",
      })
    );
  }

  let cardOwnerProfile: Profile | null = null;
  if (card?.owner) {
    cardOwnerProfile = await getProfileFromAddress(
      ipfsDomain,
      communityConfig,
      card.owner
    );
  }

  return (
    <div
      className="min-h-screen w-full max-w-md mx-auto"
      style={{
        backgroundColor: colors.light,
      }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: colors.light }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="coin"
                  width={24}
                  height={24}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              <h1 className="text-xl font-bold" style={{ color: colors.text }}>
                {tServer("brussels_pay", props.language)}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Success Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.primary }}
          >
            <LockIcon className="w-10 h-10 text-white" />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            {tServer("card", props.language)}
          </h2>
        </div>

        {/* Card Display */}
        <div className="flex justify-center items-center">
          <NFCCard
            cardColor={cardColor}
            profile={profile ?? undefined}
            config={config}
            className="mt-2 mb-8"
            topUpLink={
              topUpPlugin
                ? `${topUpPlugin.url}?account=${cardAddress}&token=${tokenConfig.address}`
                : undefined
            }
          />
        </div>

        {/* Card Info */}
        <Card
          className="max-w-md mx-auto mb-6"
          style={{ borderColor: colors.light }}
        >
          <CardContent className="p-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text }}
            >
              {tServer("card_information", props.language)}
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("project", props.language)}
                </span>
                <span
                  className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100"
                  style={{ color: colors.textLight }}
                >
                  {card?.project ?? project ?? "brussels-pay"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("card_type", props.language)}
                </span>
                <div
                  className="flex items-center space-x-2 px-2 py-1 rounded-full text-white"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  <span className="text-sm font-medium ">Brussels Pay NFC</span>
                  <Image src="/nfc.png" alt="nfc" width={16} height={16} />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("serial_number", props.language)}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.primary }}
                >
                  {serialNumber}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textLight }}>
                  {tServer("security", props.language)}
                </span>
                <div className="flex items-center space-x-2">
                  <Shield
                    className="w-4 h-4"
                    style={{ color: colors.primary }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: colors.primary }}
                  >
                    {challenge === "pin" || challenge === "wrong-pin"
                      ? tServer("pin", props.language)
                      : tServer("no_pin", props.language)}
                  </span>
                </div>
              </div>

              {cardOwnerProfile && (
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: colors.textLight }}>
                    {tServer("owner", props.language)}
                  </span>
                  <div className="flex items-center space-x-2 pl-1 pr-2 py-1 rounded-full bg-gray-100">
                    <Image
                      src={cardOwnerProfile.image_small}
                      alt="card owner profile image"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.primary }}
                    >
                      @{cardOwnerProfile.username}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto space-y-3">
          <p
            className="text-sm text-center"
            style={{ color: colors.textLight }}
          >
            {tServer("is_this_your_card", props.language)}
          </p>
          <SetupCardButton
            colors={colors}
            serialNumber={serialNumber}
            label={tServer("import_card", props.language)}
          />
        </div>

        {/* Info Section */}
        <div className="max-w-md mx-auto mt-8">
          <Card className="bg-blue-50" style={{ borderColor: colors.light }}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">ℹ</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    {tServer("using_your_secured_card", props.language)}
                  </p>
                  <p className="text-xs text-blue-700">
                    {tServer(
                      "using_your_secured_card_description",
                      props.language
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-white border-t mt-12"
        style={{ borderColor: colors.light }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: colors.textLight }}>
              {tServer("brussels_pay", props.language)}
            </p>
            <p className="text-xs" style={{ color: colors.primary }}>
              {tServer(
                "supporting_our_community_through_local_payments",
                props.language
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
