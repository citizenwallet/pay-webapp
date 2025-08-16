"use server";

import { ProfileWithTokenId } from "@citizenwallet/sdk";

export interface ATransaction {
  id: string;
  hash: string;
  contract: string;
  created_at: string;
  updated_at: string;
  from: string;
  to: string;
  value: string;
  description: string;
  status: string;
  from_profile?: ProfileWithTokenId;
  to_profile?: ProfileWithTokenId;
}

export async function getNewTransactions(
  account: string,
  tokenAddress: string,
  fromDate: Date
): Promise<ATransaction[]> {
  if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
    throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
  }

  // Build URL with pagination parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/app/transactions/new`
  );

  url.searchParams.append("account", account);
  url.searchParams.append("contract", tokenAddress);
  url.searchParams.append("from_date", fromDate.toISOString());

  const response = await fetch(url.toString());

  const data = await response.json();

  return data.transactions ?? [];
}

export async function getTransactions(
  account: string,
  tokenAddress: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ transactions: ATransaction[]; total: number }> {
  if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
    throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
  }

  // Build URL with pagination parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/app/transactions`
  );

  url.searchParams.append("account", account);
  url.searchParams.append("contract", tokenAddress);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());

  const response = await fetch(url.toString());

  const data = await response.json();

  return { transactions: data.transactions ?? [], total: data.total ?? 0 };
}

export async function getTransaction(
  hash: string
): Promise<ATransaction | null> {
  if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
    throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
  }

  // Build URL with pagination parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/app/transactions/${hash}`
  );

  const response = await fetch(url.toString());

  const data = await response.json();

  return data.transaction ?? null;
}
