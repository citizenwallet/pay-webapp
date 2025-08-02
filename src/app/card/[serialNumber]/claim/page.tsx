import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, Lock, Tag, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { CommunityConfig } from "@citizenwallet/sdk";
import { getCommunityFromHeaders } from "@/services/config";
import { headers } from "next/headers";
import { getColors } from "@/utils/colors";
import { ColorMappingOverrides } from "@/components/wallet/colorMappingOverrides";

interface PageProps {
  params: Promise<{
    serialNumber: string;
  }>;
  searchParams: Promise<{
    project?: string;
    community?: string; // mistake when ordering cards, it is = project
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
  const { project, community } = await props.searchParams;

  const cardColor =
    ColorMappingOverrides[project ?? community ?? "default"] ??
    communityConfig.community.theme?.primary ??
    "#272727";

  const colors = getColors(cardColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-orange-900">La CLASS</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-orange-900 mb-4">Welcome!</h2>
          <p className="text-lg text-orange-700 mb-2 max-w-md mx-auto">
            You&apos;ve scanned a new La CLASS card
          </p>
          <p className="text-sm text-orange-600 max-w-sm mx-auto">
            Choose how you&apos;d like to use your card
          </p>
        </div>

        {/* Option 1: Claim with Brussels Pay */}
        <Card className="max-w-md mx-auto mb-6 border-2 border-orange-300 shadow-lg bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900 mb-2">
                Claim Your Card
              </h3>
              <p className="text-orange-700 text-sm mb-4">
                Secure your card with the Brussels Pay app
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">
                  Secure with PIN code
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">
                  Give your card a custom name
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">
                  Enhanced security features
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-orange-900 text-center mb-3">
                Download Brussels Pay:
              </p>

              <div className="flex flex-col space-y-2">
                <Link
                  href="https://apps.apple.com/be/app/brussels-pay/id6742148784"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download for iOS</span>
                  </Button>
                </Link>

                <Link
                  href="https://play.google.com/store/apps/details?id=brussels.pay.wallet2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download for Android</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-orange-300 flex-1 max-w-20"></div>
          <span className="px-4 text-sm text-orange-600 bg-orange-50 rounded-full">
            or
          </span>
          <div className="border-t border-orange-300 flex-1 max-w-20"></div>
        </div>

        {/* Option 2: Use Anonymously */}
        <Card className="max-w-md mx-auto mb-8 border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900 mb-2">
                Use Anonymously
              </h3>
              <p className="text-orange-700 text-sm mb-4">
                Start using your card right away without registration
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">
                  No registration required
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">
                  Start using immediately
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">
                  Basic card functionality
                </span>
              </div>
            </div>

            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Continue Anonymously
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="max-w-md mx-auto">
          <Card className="border-blue-200 bg-blue-50">
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
      <footer className="bg-white border-t border-orange-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-orange-600 mb-2">
              La Caisse Locale d&apos;Alimentation Solidaire de Schaerbeek
            </p>
            <p className="text-xs text-orange-500">
              Supporting our community through local food solidarity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
