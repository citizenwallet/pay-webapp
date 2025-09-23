import { Card, CardContent } from "@/components/ui/card";
import { Shield, User, Tag, ArrowRight, Settings } from "lucide-react";
import { CommunityConfig } from "@citizenwallet/sdk";
import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { getColors } from "@/utils/colors";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";
import Image from "next/image";
import AnonymousButton from "./anonymous-button";
import SetupCardButton from "@/components/wallet/setup-card-button";
import { getCard } from "@/services/pay/cards";
import { redirect } from "next/navigation";
import { getNavigationLink } from "@/utils/navigation-links";
import { getLanguageFromHeaders, t, tServer } from "@/lib/i18n";

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

export default async function ClaimCardPage(props: PageProps) {
  const headersList = await headers();
  const language = getLanguageFromHeaders(headersList);

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>{tServer("community_not_found", language)}</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const { serialNumber } = await props.params;
  const { project, community, token } = await props.searchParams;

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  const colors = getColors(cardColor);

  const { card } = await getCard(serialNumber);
  if (card !== null && card.owner) {
    redirect(
      getNavigationLink(serialNumber, {
        project,
        community,
        token,
        path: "/pin",
      })
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
                {tServer("brussels_pay", language)}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.primary }}
          >
            <Image
              src="/nfc.png"
              alt="coin"
              width={24}
              height={24}
              className="h-10 w-10 "
            />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            {tServer("welcome", language)}
          </h2>
          <p
            className="text-lg mb-2 max-w-md mx-auto"
            style={{ color: colors.textLight }}
          >
            {tServer("you_have_scanned_a_new_card", language)}
          </p>
          <p
            className="text-sm max-w-sm mx-auto"
            style={{ color: colors.textLight }}
          >
            {tServer("choose_how_you_would_like_to_use_your_card", language)}
          </p>
        </div>

        {/* Option 1: Configure Card */}
        <Card
          className="max-w-md mx-auto mb-6 border-2 shadow-lg bg-gradient-to-br from-white to-gray-50"
          style={{ borderColor: colors.light }}
        >
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.primary }}
              >
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: colors.text }}
              >
                {tServer("setup_your_card", language)}
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                {tServer(
                  "open_brussels_pay_to_configure_your_card_settings",
                  language
                )}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  {tServer("customize_card_settings", language)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  {tServer("set_up_security_features", language)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  {tServer("personalize_your_card", language)}
                </span>
              </div>
            </div>

            <SetupCardButton colors={colors} serialNumber={serialNumber} />
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div
            className="border-t flex-1 max-w-20"
            style={{ borderColor: colors.light }}
          ></div>
          <span
            className="px-4 text-sm rounded-full"
            style={{ color: colors.textLight, backgroundColor: colors.lighter }}
          >
            {tServer("or", language)}
          </span>
          <div
            className="border-t flex-1 max-w-20"
            style={{ borderColor: colors.light }}
          ></div>
        </div>

        {/* Option 2: Use Anonymously */}
        <Card
          className="max-w-md mx-auto mb-8 shadow-lg"
          style={{ borderColor: colors.light }}
        >
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: colors.text }}
              >
                {tServer("use_anonymously", language)}
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                {tServer(
                  "start_using_your_card_right_away_without_registration",
                  language
                )}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  {tServer("no_registration_required", language)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  {tServer("start_using_immediately", language)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  {tServer("basic_card_functionality", language)}
                </span>
              </div>
            </div>

            <AnonymousButton
              colors={colors}
              serialNumber={serialNumber}
              token={token}
              project={project}
              community={community}
            />
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="max-w-md mx-auto">
          <Card className="bg-blue-50" style={{ borderColor: colors.light }}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">ℹ</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    {tServer("good_to_know", language)}
                  </p>
                  <p className="text-xs text-blue-700">
                    {tServer(
                      "you_can_always_claim_your_card_later_through_the_brussels_pay_app_even_if_you_start_using_it_anonymously",
                      language
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
