import { OrdersState } from "./state";

export const selectOrdersByStatus =
  (status?: string) => (state: OrdersState) => {
    if (!status) {
      return state.orders;
    }

    return state.orders.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
  };

export const selectOrdersSortedByDate = (state: OrdersState) => {
  return [...state.orders].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export const selectSelectedOrder = (state: OrdersState) => {
  return state.selectedOrder;
};

export const selectOrdersPagination = (state: OrdersState) => {
  return state.pagination;
};

export const selectOrdersLoading = (state: OrdersState) => {
  return state.loading;
};
