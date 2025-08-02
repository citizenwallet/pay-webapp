import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  User,
  Lock,
  Tag,
  ArrowRight,
  Download,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { CommunityConfig } from "@citizenwallet/sdk";
import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { getColors } from "@/utils/colors";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";
import Image from "next/image";
import AnonymousButton from "./anonymous-button";
import SetupCardButton from "./setup-card-button";

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

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const { serialNumber } = await props.params;
  const { project, community, token } = await props.searchParams;

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  const colors = getColors(cardColor);

  return (
    <div
      className="min-h-screen bg-gradient-to-br"
      style={{
        background: `linear-gradient(to bottom right, ${colors.lighter}, ${colors.light})`,
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
                Brussels Pay
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
            Welcome!
          </h2>
          <p
            className="text-lg mb-2 max-w-md mx-auto"
            style={{ color: colors.textLight }}
          >
            You&apos;ve scanned a new card
          </p>
          <p
            className="text-sm max-w-sm mx-auto"
            style={{ color: colors.textLight }}
          >
            Choose how you&apos;d like to use your card
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
                Setup Your Card
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Open Brussels Pay to configure your card settings
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  Customize card settings
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  Set up security features
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  Personalize your card
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
            or
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
                Use Anonymously
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Start using your card right away without registration
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  No registration required
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  Start using immediately
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm" style={{ color: colors.text }}>
                  Basic card functionality
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
                    Good to know
                  </p>
                  <p className="text-xs text-blue-700">
                    You can always claim your card later through the Brussels
                    Pay app, even if you start using it anonymously.
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
              La Caisse Locale d&apos;Alimentation Solidaire de Schaerbeek
            </p>
            <p className="text-xs" style={{ color: colors.primary }}>
              Supporting our community through local food solidarity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
