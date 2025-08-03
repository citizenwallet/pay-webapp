import { useMemo } from "react";
import { OrdersState, useOrdersStore, OrdersPaginationMetadata } from "./state";
import { StoreApi, UseBoundStore } from "zustand";
import { loadOrders } from "@/services/pay/orders";
import { OrderData } from "@/components/orderCard";

const RELOAD_INTERVAL = 30000;

export class OrdersActions {
  state: OrdersState;
  baseUrl: string;
  private pollingInterval?: NodeJS.Timeout;

  constructor(state: OrdersState, baseUrl: string) {
    this.state = state;
    this.baseUrl = baseUrl;
  }

  private fetchLimit = 10;
  private ordersPagination?: OrdersPaginationMetadata;
  private previousFetchLength = 0;
  private fetchedOffsets: number[] = [];
  private lastLoadedOrders: { [key: string]: number } = {};

  /**
   * Starts polling for the last 10 orders every 2 seconds
   * @param account - The account address to fetch orders for
   * @param tokenAddress - Optional token address to filter orders by
   * @returns An unsubscribe function to stop polling
   */
  listen(account: string, tokenAddress?: string): () => void {
    // Clear any existing polling
    this.stopPolling();

    // Initial fetch
    this.getOrders(account, tokenAddress, true);

    // Start polling every 2 seconds
    this.pollingInterval = setInterval(() => {
      this.getOrders(account, tokenAddress);
    }, 2000);

    // Return unsubscribe function
    return () => {
      this.stopPolling();
    };
  }

  /**
   * Stops the polling interval
   */
  private stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = undefined;
    }
  }

  /**
   * Retrieves orders for a given account and token.
   *
   * @param account - The account address to fetch orders for
   * @param tokenAddress - The token address to filter orders by
   * @param reset - Indicates whether to reset the state before fetching orders
   * @returns A promise that resolves to a boolean indicating whether more orders are available
   */
  async getOrders(
    account: string,
    tokenAddress?: string,
    reset = false
  ): Promise<boolean> {
    try {
      if (reset) {
        this.ordersPagination = undefined;
        this.previousFetchLength = 0;
        this.fetchedOffsets = [];
      }

      if (this.ordersPagination && this.previousFetchLength < this.fetchLimit) {
        // nothing more to fetch
        return false;
      }

      const nextOffset = this.ordersPagination
        ? this.ordersPagination.offset + this.fetchLimit
        : 0;

      if (this.fetchedOffsets.includes(nextOffset)) {
        return false;
      }
      this.fetchedOffsets.push(nextOffset);

      this.state.startLoading();

      const response = await loadOrders(
        account,
        tokenAddress || "",
        this.fetchLimit,
        nextOffset
      );

      const orders = response.orders || [];
      this.previousFetchLength = orders.length;

      // Create pagination metadata
      this.ordersPagination = {
        offset: nextOffset,
        limit: this.fetchLimit,
        total: response.orders.length || 0,
        hasMore: orders.length === this.fetchLimit,
      };

      this.state.setPagination(this.ordersPagination);

      if (reset) {
        this.state.replaceOrders(orders);
      } else {
        this.state.appendOrders(orders);
      }

      this.state.stopLoading();
      return this.ordersPagination.hasMore;
    } catch (error) {
      console.error("Error loading orders:", error);
      this.state.setError(
        error instanceof Error ? error.message : "Failed to load orders"
      );
      this.state.stopLoading();
      return false;
    }
  }

  /**
   * Load orders with caching similar to profiles
   */
  async loadOrders(account: string, tokenAddress?: string, reset = false) {
    const cacheKey = `${account}-${tokenAddress}`;

    if (reset) {
      this.lastLoadedOrders[cacheKey] = 0;
    }

    if (this.lastLoadedOrders[cacheKey]) {
      const now = new Date().getTime();
      if (now - this.lastLoadedOrders[cacheKey] < RELOAD_INTERVAL) {
        return;
      }
    }
    this.lastLoadedOrders[cacheKey] = new Date().getTime();

    await this.getOrders(account, tokenAddress, reset);
  }

  clear() {
    this.stopPolling();
    this.state.clear();
    this.ordersPagination = undefined;
    this.previousFetchLength = 0;
    this.fetchedOffsets = [];
    this.lastLoadedOrders = {};
  }
}

export const useOrders = (
  baseUrl: string
): [UseBoundStore<StoreApi<OrdersState>>, OrdersActions] => {
  const ordersStore = useOrdersStore;

  const actions = useMemo(
    () => new OrdersActions(ordersStore.getState(), baseUrl),
    [ordersStore, baseUrl]
  );

  return [ordersStore, actions];
};
