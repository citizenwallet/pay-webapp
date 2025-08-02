import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarUrl } from "@/lib/utils";
import { formatAddress } from "@/utils/formatting";
import { ConfigToken, Profile } from "@citizenwallet/sdk";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import getStatusBadge from "./getStatusBadge";
import { ProfilesActions } from "@/state/profiles/actions";
import { ProfilesState } from "@/state/profiles/state";
import { StoreApi, UseBoundStore } from "zustand";
import Image from "next/image";

interface MenuItem {
  id: number;
  vat: number;
  name: string;
  image: string | null;
  order: number;
  price: number;
  hidden: boolean;
  category: string;
  place_id: number;
  description: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  description?: string;
}

interface Place {
  slug: string;
  items: MenuItem[]; // All available menu items for this place
  display: string;
  accounts: string[];
}

export interface OrderData {
  id: number;
  created_at: string;
  total: number;
  due: number;
  items: OrderItem[]; // The actual items that were ordered
  status: string;
  place_id: number;
  completed_at: string | null;
  description: string;
  tx_hash: string;
  type: string;
  account: string;
  fees: number;
  payout_id: number | null;
  pos: string;
  processor_tx: string | null;
  refund_id: number | null;
  token: string;
  place: Place;
}

interface OrderCardProps {
  data: OrderData;
  project?: string;
  token: ConfigToken;
  profiles: { [key: string]: Profile };
  onOrderRendered: (order: OrderData) => void;
}

export default function OrderCard({
  data,
  project,
  token,
  profiles,
  onOrderRendered,
}: OrderCardProps) {
  const formattedDate = useMemo(() => {
    return new Date(data.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [data.created_at]);

  const profile: Profile | undefined = profiles[data.place.accounts[0] ?? ""];

  useEffect(() => {
    if (data) {
      onOrderRendered(data);
    }
  }, [data, onOrderRendered]);

  const hasItems = data.items && data.items.length > 0;
  const hasDescription = data.description && data.description.trim() !== "";

  let link = `/order/${data.id}?token=${token.address}`;
  if (project) {
    link += `&project=${project}`;
  }

  return (
    <Link href={link}>
      <Flex
        justify="start"
        align="start"
        className="w-full max-w-full p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        gap="4"
      >
        <Flex direction="column" className="flex-1" gap="2">
          <Flex align="center" gap="3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage
                src={getAvatarUrl(profile?.image_medium, data.account)}
                alt="user profile photo"
                className="object-cover"
              />
              <AvatarFallback>
                {profile?.username?.charAt(0).toUpperCase() ?? "CN"}
              </AvatarFallback>
            </Avatar>
            <Flex direction="column">
              <Text size="3" weight="bold">
                {profile?.name ?? "Anonymous"}
              </Text>
              <Text size="2" className="text-muted-foreground">
                {profile?.username ?? data.place.slug}
              </Text>
            </Flex>
          </Flex>

          <Text size="4" weight="medium" className="text-primary">
            Order #{data.id}
          </Text>

          {hasItems && (
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium" className="text-gray-700">
                Items:
              </Text>
              <Flex direction="column" gap="1">
                {data.items.slice(0, 3).map((item: any, index: number) => (
                  <Text key={index} size="2" className="text-gray-600 ml-2">
                    • {item.name || `Item ${index + 1}`}
                  </Text>
                ))}
                {data.items.length > 3 && (
                  <Text size="2" className="text-gray-500 ml-2">
                    +{data.items.length - 3} more items
                  </Text>
                )}
              </Flex>
            </Flex>
          )}

          {hasDescription && (
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium" className="text-gray-700">
                Description:
              </Text>
              <Text size="2" className="text-gray-600 ml-2">
                {data.description}
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex
          direction="column"
          justify="start"
          align="end"
          gap="2"
          className="min-w-[120px]"
        >
          <div className="flex justify-end">{getStatusBadge(data)}</div>

          <div className="flex justify-end items-center">
            <Image
              src={token.logo ?? "/coin.png"}
              alt="card"
              width={20}
              height={20}
              className="h-6 w-6 mr-1"
            />
            <Text size="4" weight="bold" className="text-primary">
              {(data.total / 100).toFixed(2)}
            </Text>
          </div>

          <Text size="2" className="text-gray-500 text-right">
            {formattedDate}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
