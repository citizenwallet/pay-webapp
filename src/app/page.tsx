import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  CreditCard,
  Zap,
  Users,
  ArrowRight,
  Wifi,
} from "lucide-react";
import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { CommunityConfig } from "@citizenwallet/sdk";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";
import Link from "next/link";
import { getColors } from "@/utils/colors";

interface PageProps {
  searchParams: Promise<{
    project?: string;
    community?: string; // mistake when ordering cards, it is = project
  }>;
}

export default async function NFCLandingPage(props: PageProps) {
  const headersList = await headers();

  const config = await getCommunityFromHeaders(headersList);
  if (!config) {
    return <div>Community not found</div>;
  }

  const communityConfig = new CommunityConfig(config);

  const { project, community } = await props.searchParams;

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
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <CreditCard className="w-5 h-5 text-white" />
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
            <Wifi className="w-10 h-10 text-white" />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Welcome to Brussels Pay
          </h2>
          <p
            className="text-lg mb-6 max-w-md mx-auto"
            style={{ color: colors.textLight }}
          >
            Your NFC card system for Brussels Pay
          </p>
        </div>

        {/* Main Card */}
        <Card
          className="max-w-md mx-auto mb-8 shadow-lg"
          style={{ borderColor: colors.light }}
        >
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.light }}
              >
                <Smartphone
                  className="w-8 h-8"
                  style={{ color: colors.textLight }}
                />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Scan Your NFC Card
              </h3>
              <p style={{ color: colors.textLight }}>
                Hold your phone near your card to access your account
                information
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: colors.primary }}
                >
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.text }}
                  >
                    Enable NFC
                  </p>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    Make sure NFC is enabled on your phone
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: colors.primary }}
                >
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.text }}
                  >
                    Tap Your Card
                  </p>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    Hold your phone close to your Brussels Pay card
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: colors.primary }}
                >
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.text }}
                  >
                    View Your Info
                  </p>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    Access your card details and account information
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <Card style={{ borderColor: colors.light }}>
            <CardContent className="p-4 text-center">
              <Zap
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: colors.primary }}
              />
              <h4 className="font-semibold mb-1" style={{ color: colors.text }}>
                Instant Access
              </h4>
              <p className="text-sm" style={{ color: colors.textLight }}>
                Quick and secure card information
              </p>
            </CardContent>
          </Card>

          <Card style={{ borderColor: colors.light }}>
            <CardContent className="p-4 text-center">
              <Users
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: colors.primary }}
              />
              <h4 className="font-semibold mb-1" style={{ color: colors.text }}>
                Community
              </h4>
              <p className="text-sm" style={{ color: colors.textLight }}>
                Supporting local payments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="mb-4" style={{ color: colors.textLight }}>
            Don&apos;t have a Brussels Pay card yet?
          </p>
          <Link href="https://pay.brussels">
            <Button
              className="text-white"
              style={
                {
                  backgroundColor: colors.primary,
                  "--tw-ring-color": colors.dark,
                } as React.CSSProperties
              }
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
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
              Brussels Pay
            </p>
            <p className="text-xs" style={{ color: colors.primary }}>
              Supporting our community through local payments
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
