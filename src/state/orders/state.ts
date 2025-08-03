import { OrderData } from "@/components/tx-card";
import { create } from "zustand";

export interface OrdersState {
  loading: boolean;
  orders: Record<string, OrderData>;
  error: string | null;
  startLoading: () => void;
  stopLoading: () => void;
  setOrders: (orders: Record<string, OrderData>) => void;
  addOrder: (order: OrderData) => void;
  replaceOrders: (orders: Record<string, OrderData>) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

const initialState = () => ({
  orders: {},
  loading: false,
  error: null,
  pagination: undefined,
});

export const useOrdersStore = create<OrdersState>((set) => ({
  ...initialState(),
  startLoading: () => set({ loading: true, error: null }),
  stopLoading: () => set({ loading: false }),
  setOrders: (orders) => set({ orders }),
  addOrder: (order) =>
    set((state) => ({ orders: { ...state.orders, [order.tx_hash]: order } })),
  replaceOrders: (orders) => set({ orders }),
  setError: (error) => set({ error, loading: false }),
  clear: () => set(initialState()),
}));
