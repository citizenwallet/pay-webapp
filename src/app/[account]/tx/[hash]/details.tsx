"use client";

import { OrderData } from "@/components/tx-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslation } from "@/lib/use-translation";
import { translateStatus } from "@/lib/i18n";
import { ATransaction } from "@/services/pay/transactions";
import { formatAddress } from "@/utils/formatting";
import { Profile } from "@citizenwallet/sdk";
import { Flex, Text } from "@radix-ui/themes";
import { ArrowLeft, Calendar, FileText, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DetailsPageProps {
  tokenLogo: string;
  transaction: ATransaction;
  order?: OrderData;
  profile: Profile;
  orderDate: string;
}

export default function DetailsPage({
  tokenLogo,
  transaction,
  order,
  profile,
  orderDate,
}: DetailsPageProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const getItemNameById = (itemId: number) => {
    if (!order?.place?.items) return `Item ${itemId}`;
    const placeItem = order?.place.items.find((item) => item.id === itemId);
    return placeItem?.name || `Item ${itemId}`;
  };

  const getItemPriceById = (itemId: number): number => {
    if (!order?.place?.items) return 0;
    const placeItem = order?.place.items.find((item) => item.id === itemId);
    return placeItem?.price ?? 0;
  };

  const description =
    order?.description.trim() ?? transaction.description.trim();

  return (
    <div className="relative flex min-h-screen w-full flex-col align-center p-4 max-w-xl">
      <div className="mb-6">
        <div
          onClick={goBack}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back_to_transactions")}
        </div>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <Flex direction="column" gap="4">
            {order ? (
              <Text size="6" weight="bold" className="text-gray-900">
                {t("order_number", { id: order.id })}
              </Text>
            ) : (
              <Text size="6" weight="bold" className="text-gray-900">
                {t("transaction_number", { id: formatAddress(transaction.id) })}
              </Text>
            )}

            <Flex align="center" gap="4" className="p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage
                  src={profile.image}
                  alt="place profile"
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-semibold">
                  {profile.name?.charAt(0).toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
              <Flex direction="column" gap="1">
                <Text size="5" weight="bold" className="text-gray-900">
                  {profile.name}
                </Text>
                <Text size="3" className="text-gray-600">
                  {profile.username}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Image
                  src={tokenLogo}
                  alt="coin"
                  width={24}
                  height={24}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              <div>
                <Text size="2" className="text-gray-600 block">
                  {t("amount")}
                </Text>
                <Text size="5" weight="bold" className="text-blue-600">
                  {transaction.value}
                </Text>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <Text size="2" className="text-gray-600 block">
                  {t("status")}
                </Text>
                <div className="mt-1">
                  {translateStatus(order?.status ?? transaction.status)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <Text size="2" className="text-gray-600 block">
                {t("order_date")}
              </Text>
              <Text size="4" weight="medium" className="text-purple-600">
                {orderDate}
              </Text>
            </div>
          </div>

          {order?.items && order.items.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-600" />
                <Text size="4" weight="bold" className="text-gray-900">
                  {t("items", { count: order.items.length })}
                </Text>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {order.items.map((orderItem, index) => (
                  <div
                    key={orderItem.id || index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <Text size="3" weight="medium" className="text-gray-900">
                        {getItemNameById(orderItem.id)}
                      </Text>
                      <Text size="2" className="text-gray-600 ml-4">
                        {t("qty", { count: orderItem.quantity || 1 })}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={tokenLogo}
                        alt="coin"
                        width={24}
                        height={24}
                        className="h-5 w-5 text-blue-600"
                      />
                      <Text size="3" weight="bold" className="text-blue-600">
                        {(
                          (Number(getItemPriceById(orderItem.id) ?? 0) *
                            (orderItem.quantity ?? 1)) /
                          100
                        ).toFixed(2)}
                      </Text>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <Text size="4" weight="bold" className="text-gray-900">
                      {t("total")}
                    </Text>
                    <div className="flex items-center gap-2">
                      <Image
                        src={tokenLogo}
                        alt="coin"
                        width={24}
                        height={24}
                        className="h-5 w-5 text-blue-600"
                      />
                      <Text size="5" weight="bold" className="text-blue-600">
                        {(order.total / 100).toFixed(2)}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {description && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <Text size="4" weight="bold" className="text-gray-900">
                  {t("description")}
                </Text>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Text size="3" className="text-gray-700 leading-relaxed">
                  {description}
                </Text>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
