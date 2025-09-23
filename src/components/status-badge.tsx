import { Badge } from "@radix-ui/themes";
import React from "react";
import { OrderData } from "./tx-card";
import { useTranslation } from "@/lib/use-translation";

interface StatusBadgeProps {
  order: OrderData;
}

export default function StatusBadge({ order }: StatusBadgeProps) {
  const { t } = useTranslation();

  switch (order.status.toLowerCase()) {
    case "refund":
    case "refunded":
      return (
        <Badge
          variant="soft"
          className="bg-orange-100 text-orange-800 border-orange-200"
        >
          {t("refunded")}
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="soft"
          className="bg-gray-100 text-gray-800 border-gray-200"
        >
          {t("pending")}
        </Badge>
      );
    default:
      return null;
  }
}
