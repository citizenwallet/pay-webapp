"use server";

import { OrderData } from "@/components/orderCard";

export async function loadOrders(
  account: string,
  tokenAddress: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ orders: OrderData[]; total: number }> {
  if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
    throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
  }

  // Build URL with pagination parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/accounts/${account}/orders`
  );

  if (tokenAddress) {
    url.searchParams.append("token", tokenAddress);
  }
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());

  const response = await fetch(url.toString());

  const data = await response.json();

  return { orders: data.orders, total: data.total };
}
