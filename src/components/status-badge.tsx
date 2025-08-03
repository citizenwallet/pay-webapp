import { Badge } from "@radix-ui/themes";
import React from "react";
import { OrderData } from "./tx-card";

interface StatusBadgeProps {
  order: OrderData;
}

export default function StatusBadge({ order }: StatusBadgeProps) {
  switch (order.status.toLowerCase()) {
    case "refund":
    case "refunded":
      return (
        <Badge
          variant="soft"
          className="bg-orange-100 text-orange-800 border-orange-200"
        >
          Refunded
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="soft"
          className="bg-gray-100 text-gray-800 border-gray-200"
        >
          Pending
        </Badge>
      );
    default:
      return null;
  }
}
