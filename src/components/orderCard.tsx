import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAvatarUrl } from "@/lib/utils";
import { formatAddress } from "@/utils/formatting";
import { ConfigToken } from "@citizenwallet/sdk";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useMemo } from "react";
import getStatusBadge from "./getStatusBadge";

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
    token: ConfigToken;
    profile?: any;
}

export default function OrderCard({
    data,
    token,
    profile
}: OrderCardProps) {

    const formattedDate = useMemo(() => {
        return new Date(data.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, [data.created_at]);


    const hasItems = data.items && data.items.length > 0;
    const hasDescription = data.description && data.description.trim() !== "";


    return (
        <Link href={`/order/${data.id}`}>
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
                                {data.place?.slug ?? "Anonymous"}
                            </Text>
                            <Text size="2" className="text-muted-foreground">
                                {profile?.username ?? formatAddress(data.account)}
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


                <Flex direction="column" justify="start" align="end" gap="2" className="min-w-[120px]">

                    <div className="flex justify-end">
                        {getStatusBadge(data)}
                    </div>


                    <Text size="4" weight="bold" className="text-primary">
                        {(data.total / 100).toFixed(2)}
                    </Text>


                    <Text size="2" className="text-gray-500 text-right">
                        {formattedDate}
                    </Text>
                </Flex>
            </Flex>
        </Link>
    );
}
