import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import * as cartActions from "@/lib/features/cartSlice";
import * as wishlistActions from "@/lib/features/wishlistSlice";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    ...Object.values(cartActions),
    ...Object.values(wishlistActions)
  ),
  effect: (action, listenerApi) => {
    if (typeof window !== "undefined") {
      const state = listenerApi.getState();
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    }
  },
});

export default localStorageMiddleware;
