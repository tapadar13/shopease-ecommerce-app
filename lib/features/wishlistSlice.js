import { createSlice } from "@reduxjs/toolkit";

const initialState = () => ({
  items: [],
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const newItem = action.payload;
      if (!state.items.some((item) => item.id === newItem.id)) {
        state.items.push(newItem);
      }
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearWishlist(state) {
      state.items = [];
    },
    setWishlist: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
