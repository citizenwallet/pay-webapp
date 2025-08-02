"use client";

import { Button } from "@/components/ui/button";
import { Colors } from "@/utils/colors";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/utils/baseUrl";

export default function AnonymousButton({
  colors,
  serialNumber,
  token,
  project,
  community,
}: {
  colors: Colors;
  serialNumber: string;
  token?: string;
  project?: string;
  community?: string;
}) {
  const baseUrl = getBaseUrl();
  const router = useRouter();

  const cardLink = new URL(`${baseUrl}/card/${serialNumber}`);
  if (token) {
    cardLink.searchParams.set("token", token);
  }

  if (project) {
    cardLink.searchParams.set("project", project);
  }

  if (community) {
    cardLink.searchParams.set("community", community);
  }

  const handleClick = () => {
    window.localStorage.setItem("anonymous-card", serialNumber);

    router.push(cardLink.toString());
  };

  return (
    <Button
      className="w-full text-white"
      style={
        {
          backgroundColor: colors.primary,
          "--tw-ring-color": colors.dark,
        } as React.CSSProperties
      }
      onClick={handleClick}
    >
      Continue Anonymously
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
}
