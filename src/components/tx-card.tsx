import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getAvatarUrl } from "@/lib/utils";
import { ConfigToken, Profile } from "@citizenwallet/sdk";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import StatusBadge from "./status-badge";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Colors } from "@/utils/colors";
import { ATransaction } from "@/services/pay/transactions";
import { useTranslation } from "@/lib/use-translation";
import { ZeroAddress } from "ethers";
import { getTreasuryProfile } from "@/services/config";

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

interface TransactionCardProps {
  serialNumber?: string;
  cardAddress: string;
  transaction: ATransaction;
  order?: OrderData;
  colors: Colors;
  project?: string;
  token: ConfigToken;
  onTxRendered: (tx: ATransaction) => void;
}

export default function TransactionCard({
  serialNumber,
  cardAddress,
  transaction,
  order,
  colors,
  project,
  token,
  onTxRendered,
}: TransactionCardProps) {
  const { t } = useTranslation();

  const formattedDate = useMemo(() => {
    return new Date(transaction.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [transaction.created_at]);

  let profile: Profile | undefined =
    cardAddress.toLowerCase() === transaction.to.toLowerCase()
      ? transaction.from_profile
      : transaction.to_profile;
  if (profile?.account === ZeroAddress) {
    profile = getTreasuryProfile(token);
  }

  const isOutgoing =
    cardAddress.toLowerCase() === transaction.from.toLowerCase();

  useEffect(() => {
    if (transaction) {
      onTxRendered(transaction);
    }
  }, [transaction, onTxRendered]);

  const hasItems = order?.items && order.items.length > 0;
  const hasDescription =
    transaction?.description ||
    (order?.description && order.description.trim() !== "");
  const description = transaction?.description || order?.description;

  let link = serialNumber
    ? `/card/${serialNumber}/tx/${transaction.hash}?token=${token.address}`
    : `/${cardAddress}/tx/${transaction.hash}?token=${token.address}`;
  if (project) {
    link += `&project=${project}`;
  }

  const getItemNameById = (itemId: number) => {
    if (!order?.place?.items) return `Item ${itemId}`;
    const placeItem = order.place.items.find((item) => item.id === itemId);
    return placeItem?.name || `Item ${itemId}`;
  };

  const getItemPriceById = (itemId: number): number => {
    if (!order?.place?.items) return 0;
    const placeItem = order.place.items.find((item) => item.id === itemId);
    return placeItem?.price ?? 0;
  };

  return (
    <Link href={link} className="w-full">
      <Card
        key={transaction.id}
        className="w-full shadow-md transition-shadow animate-fade-in"
        style={{ borderColor: colors.primary }}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Flex direction="column" className="flex-1" gap="2">
              <Flex align="center" gap="3">
                <Avatar
                  className="h-12 w-12 border-2"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.text,
                    borderColor: colors.primary,
                  }}
                >
                  <AvatarImage
                    src={profile?.image_medium ?? "/shop.png"}
                    alt="user profile photo"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {profile?.username?.charAt(0).toUpperCase() ?? "CN"}
                  </AvatarFallback>
                </Avatar>
                <Flex direction="column">
                  <Text size="3" weight="bold" className="line-clamp-2">
                    {profile?.name ?? t("anonymous")}
                  </Text>
                  <Text
                    size="2"
                    style={{
                      color: colors.textLight,
                    }}
                  >
                    @
                    {(
                      profile?.username ??
                      order?.place.slug ??
                      "anonymous"
                    ).replace("@", "")}
                  </Text>
                </Flex>
              </Flex>

              {order && (
                <Text
                  size="4"
                  weight="medium"
                  className="animate-fade-in"
                  style={{
                    color: colors.primary,
                  }}
                >
                  {t("order_number", { id: order.id })}
                </Text>
              )}

              {hasItems && (
                <Flex direction="column" gap="1" className="animate-fade-in">
                  <Text size="2" weight="medium" className="text-gray-700">
                    {t("items")}
                  </Text>
                  <Flex direction="column" gap="1">
                    {order?.items.map((item: OrderItem, index: number) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <Text
                          key={index}
                          size="2"
                          className="text-gray-600 ml-2"
                        >
                          • {getItemNameById(item.id) || `Item ${index + 1}`} x{" "}
                          {item.quantity ?? 1}
                        </Text>
                        <div className="flex items-center gap-2">
                          <Image
                            src={token.logo ?? "/coin.png"}
                            alt="item"
                            width={20}
                            height={20}
                          />
                          <Text size="2" className="text-gray-600">
                            {(getItemPriceById(item.id) / 100).toFixed(2)}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </Flex>
                </Flex>
              )}

              {hasDescription && (
                <Flex direction="column" gap="1" className="animate-fade-in">
                  <Text size="2" weight="medium" className="text-gray-700">
                    {t("description")}
                  </Text>
                  <Text size="2" className="text-gray-600 ml-2">
                    {description}
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
              {order && (
                <div className="flex justify-end animate-fade-in">
                  <StatusBadge order={order} />
                </div>
              )}

              <div className="flex justify-end items-center">
                <Image
                  src={token.logo ?? "/coin.png"}
                  alt="card"
                  width={20}
                  height={20}
                  className="h-6 w-6 mr-1"
                />
                <Text
                  size="4"
                  weight="bold"
                  className={cn("text-primary", order?.status === "refunded")}
                >
                  {isOutgoing ? "- " : "+ "}
                  {transaction.value}
                </Text>
              </div>

              <Text size="2" className="text-gray-500 text-right">
                {formattedDate}
              </Text>
            </Flex>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
