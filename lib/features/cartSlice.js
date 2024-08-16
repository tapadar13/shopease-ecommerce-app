import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  discount: 0,
  appliedDiscount: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount += newItem.price;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      if (state.appliedDiscount) {
        const { type, value } = state.appliedDiscount;
        if (type === "percentage") {
          state.discount = (state.totalAmount * value) / 100;
        } else if (type === "fixed") {
          state.discount = Math.min(value, state.totalAmount);
        }
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      if (state.appliedDiscount) {
        const { type, value } = state.appliedDiscount;
        if (type === "percentage") {
          state.discount = (state.totalAmount * value) / 100;
        } else if (type === "fixed") {
          state.discount = Math.min(value, state.totalAmount);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.discount = 0;
      state.appliedDiscount = null;
    },
    applyDiscount(state, action) {
      const { type, value, code } = action.payload;

      if (type === "percentage") {
        state.discount = (state.totalAmount * value) / 100;
      } else if (type === "fixed") {
        state.discount = Math.min(value, state.totalAmount);
      }

      state.appliedDiscount = { type, value, code };
    },
    removeDiscount: (state) => {
      state.discount = 0;
      state.appliedDiscount = null;
    },
    incrementItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }

      if (state.appliedDiscount) {
        const { type, value } = state.appliedDiscount;
        if (type === "percentage") {
          state.discount = (state.totalAmount * value) / 100;
        } else if (type === "fixed") {
          state.discount = Math.min(value, state.totalAmount);
        }
      }
    },
    decrementItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      }
      if (state.appliedDiscount) {
        const { type, value } = state.appliedDiscount;
        if (type === "percentage") {
          state.discount = (state.totalAmount * value) / 100;
        } else if (type === "fixed") {
          state.discount = Math.min(value, state.totalAmount);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItem,
  decrementItem,
  clearCart,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
