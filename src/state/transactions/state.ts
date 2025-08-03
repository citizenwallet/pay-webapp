import { ATransaction } from "@/services/pay/transactions";
import { create } from "zustand";

export interface TransactionsPaginationMetadata {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface TransactionsState {
  loading: boolean;
  transactions: ATransaction[];
  selectedTransaction: ATransaction | null;
  error: string | null;
  pagination?: TransactionsPaginationMetadata;
  startLoading: () => void;
  stopLoading: () => void;
  setTransactions: (transactions: ATransaction[]) => void;
  appendTransactions: (transactions: ATransaction[]) => void;
  upsertNewTransactions: (transactions: ATransaction[]) => void;
  replaceTransactions: (transactions: ATransaction[]) => void;
  setSelectedTransaction: (transaction: ATransaction | null) => void;
  setPagination: (pagination: TransactionsPaginationMetadata) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

const initialState = () => ({
  transactions: [] as ATransaction[],
  selectedTransaction: null,
  loading: false,
  error: null,
  pagination: undefined,
});

export const useTransactionsStore = create<TransactionsState>((set) => ({
  ...initialState(),
  startLoading: () => set({ loading: true, error: null }),
  stopLoading: () => set({ loading: false }),
  setTransactions: (transactions) => set({ transactions }),
  appendTransactions: (newTransactions) =>
    set((state) => ({
      transactions: [...state.transactions, ...newTransactions],
    })),
  upsertNewTransactions: (newTransactions) =>
    set((state) => {
      // Create a map of existing transactions by ID for quick lookup
      const existingTransactionsMap = new Map(
        state.transactions.map((transaction) => [transaction.id, transaction])
      );

      // Separate new transactions that don't exist yet
      const trulyNewTransactions = newTransactions.filter(
        (transaction) => !existingTransactionsMap.has(transaction.id)
      );

      // Create updated transactions list:
      // 1. Add new transactions to the top
      // 2. Replace existing transactions with updated versions
      const updatedTransactions = [
        ...trulyNewTransactions,
        ...state.transactions.map((transaction) => {
          const updatedTransaction = newTransactions.find(
            (t) => t.id === transaction.id
          );
          return updatedTransaction || transaction;
        }),
      ];

      return {
        transactions: updatedTransactions,
      };
    }),
  replaceTransactions: (transactions) => set({ transactions }),
  setSelectedTransaction: (transaction) =>
    set({ selectedTransaction: transaction }),
  setPagination: (pagination) => set({ pagination }),
  setError: (error) => set({ error, loading: false }),
  clear: () => set(initialState()),
}));
