"use client";

import { Button } from "@/components/ui/button";
import { Colors } from "@/utils/colors";
import { Settings, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/lib/use-translation";

export default function SetupCardButton({
  colors,
  serialNumber,
  label,
}: {
  colors: Colors;
  serialNumber: string;
  label?: string;
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const appSchemeUrl = `${process.env.NEXT_PUBLIC_APP_SCHEME}tap.pay.brussels/card/${serialNumber}`;

  const handleSetupCard = async () => {
    try {
      setShowFallback(false);
      setLoading(true);
      // Try to open the app scheme
      window.location.href = appSchemeUrl;

      // Set a timeout to show fallback if the app doesn't open
      setTimeout(() => {
        setShowFallback(true);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to open app scheme:", error);
      setShowFallback(true);
      setLoading(false);
    }
  };

  if (showFallback) {
    return (
      <div className="space-y-3 animate-fade-in">
        <p className="text-sm text-center mb-3 text-orange-500">
          {t("brussels_pay_app_not_found")}
        </p>
        <div className="flex flex-col space-y-2">
          <a
            href={process.env.NEXT_PUBLIC_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{t("download_for_ios")}</span>
            </Button>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{t("download_for_android")}</span>
            </Button>
          </a>
        </div>
        <div className="flex flex-col space-y-2 pt-4">
          <p
            className="text-sm text-center mb-3"
            style={{ color: colors.textLight }}
          >
            {t("try_again")}
          </p>
          <Button
            className="w-full text-white"
            style={
              {
                backgroundColor: colors.primary,
                "--tw-ring-color": colors.dark,
              } as React.CSSProperties
            }
            onClick={handleSetupCard}
          >
            <Settings className="w-4 h-4 mr-2" />
            {label ?? t("setup_card")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      className="w-full text-white"
      style={
        {
          backgroundColor: colors.primary,
          "--tw-ring-color": colors.dark,
        } as React.CSSProperties
      }
      onClick={handleSetupCard}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Settings className="w-4 h-4 mr-2" />
      )}
      {label ?? t("setup_card")}
    </Button>
  );
}
