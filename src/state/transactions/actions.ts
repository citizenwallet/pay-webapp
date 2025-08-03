import { useMemo } from "react";
import {
  TransactionsState,
  useTransactionsStore,
  TransactionsPaginationMetadata,
} from "./state";
import { StoreApi, UseBoundStore } from "zustand";
import {
  ATransaction,
  getNewTransactions,
  getTransactions,
} from "@/services/pay/transactions";

const RELOAD_INTERVAL = 30000;

export class TransactionsActions {
  state: TransactionsState;
  baseUrl: string;
  private pollingInterval?: NodeJS.Timeout;

  constructor(
    state: TransactionsState,
    baseUrl: string,
    initialTransactions: ATransaction[]
  ) {
    this.state = state;
    this.baseUrl = baseUrl;

    // this.transactionsPagination = {
    //   offset: this.fetchLimit,
    //   limit: this.fetchLimit,
    //   total: initialTransactions.length || 0,
    //   hasMore: initialTransactions.length < this.fetchLimit,
    // };

    // this.state.setPagination(this.transactionsPagination);

    // this.state.replaceTransactions(initialTransactions);
  }

  private listenDate: Date = new Date();
  private fetchLimit = 10;
  private transactionsPagination?: TransactionsPaginationMetadata;
  private previousFetchLength = 0;
  private fetchedOffsets: number[] = [];
  private lastLoadedOrders: { [key: string]: number } = {};

  /**
   * Starts polling for the last 10 orders every 2 seconds
   * @param account - The account address to fetch orders for
   * @param tokenAddress - Optional token address to filter orders by
   * @returns An unsubscribe function to stop polling
   */
  listen(account: string, tokenAddress: string): () => void {
    // Clear any existing polling
    this.stopPolling();

    this.listenDate = new Date();

    // Initial fetch
    this.getTransactions(account, tokenAddress, true);

    // Start polling every 2 seconds
    this.pollingInterval = setInterval(() => {
      this.getNewTransactions(account, tokenAddress);
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

  async getNewTransactions(account: string, tokenAddress: string) {
    const transactions = await getNewTransactions(
      account,
      tokenAddress || "",
      this.listenDate
    );

    this.state.upsertNewTransactions(transactions);
  }

  /**
   * Retrieves orders for a given account and token.
   *
   * @param account - The account address to fetch orders for
   * @param tokenAddress - The token address to filter orders by
   * @param reset - Indicates whether to reset the state before fetching orders
   * @returns A promise that resolves to a boolean indicating whether more orders are available
   */
  async getTransactions(
    account: string,
    tokenAddress?: string,
    reset = false
  ): Promise<boolean> {
    try {
      if (reset) {
        this.transactionsPagination = undefined;
        this.previousFetchLength = 0;
        this.fetchedOffsets = [];
      }

      if (
        this.transactionsPagination &&
        this.previousFetchLength < this.fetchLimit
      ) {
        // nothing more to fetch
        return false;
      }

      const nextOffset = this.transactionsPagination
        ? this.transactionsPagination.offset + this.fetchLimit
        : 0;

      if (this.fetchedOffsets.includes(nextOffset)) {
        return false;
      }
      this.fetchedOffsets.push(nextOffset);

      this.state.startLoading();

      const response = await getTransactions(
        account,
        tokenAddress || "",
        this.fetchLimit,
        nextOffset
      );
      console.log("response", response);

      const { transactions, total } = response || [];
      this.previousFetchLength = transactions.length;

      console.log("nextOffset", nextOffset);
      console.log("transactions.length", transactions.length);
      console.log("total", total);
      console.log("hasMore", nextOffset + transactions.length < total);

      // Create pagination metadata
      this.transactionsPagination = {
        offset: nextOffset,
        limit: this.fetchLimit,
        total: transactions.length || 0,
        hasMore: transactions.length === this.fetchLimit,
      };

      this.state.setPagination(this.transactionsPagination);

      if (reset) {
        this.state.replaceTransactions(transactions);
      } else {
        this.state.appendTransactions(transactions);
      }

      this.state.stopLoading();
      console.log("hasMore", this.transactionsPagination.hasMore);
      return this.transactionsPagination.hasMore;
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
   * Load transactions with caching similar to profiles
   */
  async loadTransactions(
    account: string,
    tokenAddress?: string,
    reset = false
  ) {
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

    await this.getTransactions(account, tokenAddress, reset);
  }

  clear() {
    this.stopPolling();
    this.state.clear();
    this.transactionsPagination = undefined;
    this.previousFetchLength = 0;
    this.fetchedOffsets = [];
    this.lastLoadedOrders = {};
  }
}

export const useTransactions = (
  baseUrl: string,
  initialTransactions: ATransaction[]
): [UseBoundStore<StoreApi<TransactionsState>>, TransactionsActions] => {
  const transactionsStore = useTransactionsStore;

  const actions = useMemo(
    () =>
      new TransactionsActions(
        transactionsStore.getState(),
        baseUrl,
        initialTransactions
      ),
    [transactionsStore, baseUrl]
  );

  return [transactionsStore, actions];
};
