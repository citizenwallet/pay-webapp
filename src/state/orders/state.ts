import { OrderData } from "@/components/orderCard";
import { create } from "zustand";

export interface OrdersPaginationMetadata {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface OrdersState {
  loading: boolean;
  orders: OrderData[];
  error: string | null;
  pagination?: OrdersPaginationMetadata;
  startLoading: () => void;
  stopLoading: () => void;
  setOrders: (orders: OrderData[]) => void;
  appendOrders: (orders: OrderData[]) => void;
  replaceOrders: (orders: OrderData[]) => void;
  setPagination: (pagination: OrdersPaginationMetadata) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

const initialState = () => ({
  orders: [],
  loading: false,
  error: null,
  pagination: undefined,
});

export const useOrdersStore = create<OrdersState>((set) => ({
  ...initialState(),
  startLoading: () => set({ loading: true, error: null }),
  stopLoading: () => set({ loading: false }),
  setOrders: (orders) => set({ orders }),
  appendOrders: (newOrders) =>
    set((state) => ({
      orders: [...state.orders, ...newOrders],
    })),
  replaceOrders: (orders) => set({ orders }),
  setPagination: (pagination) => set({ pagination }),
  setError: (error) => set({ error, loading: false }),
  clear: () => set(initialState()),
}));
