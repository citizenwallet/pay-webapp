"use client";

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
import Link from "next/link";
import { useTranslation } from "@/lib/use-translation";
import LanguageSelector from "@/components/ui/language-selector";

interface PageProps {
  searchParams: Promise<{
    project?: string;
    community?: string; // mistake when ordering cards, it is = project
  }>;
}

export default function NFCLandingPage({ searchParams }: PageProps) {
  const { t } = useTranslation();

  // Note: This is a client component now, so we need to handle the async props differently
  // In a real implementation, you might want to use a different pattern for server-side data fetching

  return (
    <div
      className="min-h-screen bg-gradient-to-br"
      style={{
        background: `linear-gradient(to bottom right, #f8fafc, #f1f5f9)`,
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Brussels Pay</h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-600">
            <Wifi className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t("welcome_to_brussels_pay")}
          </h2>
          <p className="text-lg mb-6 max-w-md mx-auto text-gray-600">
            {t("brussels_pay_subtitle")}
          </p>
        </div>

        {/* Main Card */}
        <Card className="max-w-md mx-auto mb-8 shadow-lg border-gray-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100">
                <Smartphone className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {t("scan_nfc_card")}
              </h3>
              <p className="text-gray-600">{t("scan_nfc_description")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t("enable_nfc")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("enable_nfc_description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t("tap_your_card")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("tap_card_description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t("view_your_info")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("access_your_card_details_and_account_information")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold mb-1 text-gray-900">
                {t("instant_access")}
              </h4>
              <p className="text-sm text-gray-600">
                {t("quick_and_secure_card_information")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold mb-1 text-gray-900">
                {t("community")}
              </h4>
              <p className="text-sm text-gray-600">
                {t("supporting_local_payments")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="mb-4 text-gray-600">
            {t("dont_have_a_brussels_pay_card_yet")}
          </p>
          <Link href="https://pay.brussels">
            <Button className="text-white bg-blue-600 hover:bg-blue-700">
              {t("learn_more")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm mb-2 text-gray-600">Brussels Pay</p>
            <p className="text-xs text-blue-600">
              {t("supporting_our_community_through_local_payments")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
