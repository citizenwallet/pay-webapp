"use server";

import { OrderData } from "@/components/tx-card";

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

export async function getOrderById(id: string): Promise<OrderData | null> {
  try {
    if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
      throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
    }

    // Build URL with pagination parameters
    const url = new URL(
      `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/app/orders/${id}`
    );

    const response = await fetch(url.toString());

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}

export async function getOrdersByTxHash(txHash: string): Promise<OrderData[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
      throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
    }

    // Build URL with pagination parameters
    const url = new URL(
      `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/app/orders`
    );

    url.searchParams.append("txHash", txHash);

    const response = await fetch(url.toString());

    const data = await response.json();

    return data?.orders || [];
  } catch (error) {
    return [];
  }
}
