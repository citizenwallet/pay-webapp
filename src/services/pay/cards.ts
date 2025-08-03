"use server";

export interface Card {
  serial: string;
  project: string | null;
  created_at: string;
  updated_at: string;
  owner: string | null;
  pin: string | null;
}

export type PublicCard = Omit<Card, "pin">;

export async function getCard(serialNumber: string): Promise<{
  card: PublicCard | null;
  challenge: "pin" | "wrong-pin" | null;
  status: number;
}> {
  try {
    if (!process.env.NEXT_PUBLIC_CHECKOUT_URL) {
      throw new Error("NEXT_PUBLIC_CHECKOUT_URL is not set");
    }

    // Build URL with pagination parameters
    const url = new URL(
      `${process.env.NEXT_PUBLIC_CHECKOUT_URL}/api/v1/app/cards/${serialNumber}`
    );

    const response = await fetch(url.toString());

    const data = await response.json();

    return {
      card: data?.card ?? null,
      challenge: data?.challenge ?? null,
      status: response.status,
    };
  } catch (error) {
    return { card: null, challenge: null, status: 500 };
  }
}
