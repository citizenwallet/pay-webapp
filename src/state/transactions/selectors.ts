import { TransactionsState } from "./state";

export const selectTransactionsByStatus =
  (status?: string) => (state: TransactionsState) => {
    if (!status) {
      return state.transactions;
    }

    return state.transactions.filter(
      (transaction) => transaction.status.toLowerCase() === status.toLowerCase()
    );
  };

export const selectTransactionsSortedByDate = (state: TransactionsState) => {
  return [...state.transactions].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export const selectSelectedTransaction = (state: TransactionsState) => {
  return state.selectedTransaction;
};

export const selectTransactionsPagination = (state: TransactionsState) => {
  return state.pagination;
};

export const selectTransactionsLoading = (state: TransactionsState) => {
  return state.loading;
};
