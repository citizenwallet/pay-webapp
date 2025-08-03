import { useMemo } from "react";
import { OrdersState, useOrdersStore } from "./state";
import { StoreApi, UseBoundStore } from "zustand";
import { getOrdersByTxHash, loadOrders } from "@/services/pay/orders";
import { OrderData } from "@/components/tx-card";

const RELOAD_INTERVAL = 30000;

export class OrdersActions {
  state: OrdersState;
  baseUrl: string;

  constructor(state: OrdersState, baseUrl: string) {
    this.state = state;
    this.baseUrl = baseUrl;
  }

  private lastLoadedOrders: { [key: string]: number } = {};

  async loadOrderFromTxHash(txHash: string, reset = false) {
    const cacheKey = `txHash-${txHash}`;

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

    const orders = await getOrdersByTxHash(txHash);
    orders.forEach((order) => {
      this.state.addOrder(order);
    });
  }

  clear() {
    this.state.clear();
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
