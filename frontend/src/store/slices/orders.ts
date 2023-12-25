import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'sonner'

import { api } from "../../lib/axios";

export interface Order {
  id: string;
  clientName: string;
  deliveryAddress: string;

  orderedAt: string;
  shippedAt: string;
  deliveredAt: string;
}

interface OrderState {
  isLoading: boolean;
  orders: Order[] | null;
}

const initialState: OrderState = {
  isLoading: false,
  orders: null
}

const loadOrders = createAsyncThunk(
  "orders/loadOrders",
  async (page: number) => {
    const res = await api.get<{orders: Order[]}>("/orders", {
      params: {
        page
      }
    })

    return res.data.orders;
  }
)

const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (orderUpdate: { orderId: string, status: "shipped" | "delivered" }) => {
    const { orderId, status } = orderUpdate;

    await api.put<Order>(`/orders/${orderId}/status`, {
      status
    })

    return orderUpdate;
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadOrders.pending, (state) => {
      state.isLoading = true;
    })

    builder.addCase(loadOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const { orderId, status } = action.payload;
      if (!state.orders) {
        toast.error("There is no orders to update!");
        return;
      }

      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex < 0) {
        toast.error("Order to update not found!");
      }

      if (status === "shipped") {
        state.orders[orderIndex].shippedAt = new Date().toISOString();
      }

      if (status === "delivered") {
        state.orders[orderIndex].deliveredAt = new Date().toISOString();
      }

      toast.success("Order status updated!");
    })
  },
})

export const orders = authSlice.reducer;
export const ordersActions = {
  ...authSlice.actions,
  loadOrders,
  updateOrderStatus
};
