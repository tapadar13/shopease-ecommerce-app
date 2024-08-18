import { setCart } from "./cartSlice";
import { setWishlist } from "./wishlistSlice";

export const syncStorageToState = (store) => {
  if (typeof window !== "undefined") {
    const cartData = localStorage.getItem("cart");
    const wishlistData = localStorage.getItem("wishlist");

    console.log("Syncing from localStorage - Cart:", cartData);
    console.log("Syncing from localStorage - Wishlist:", wishlistData);

    if (cartData) {
      try {
        const parsedCartData = JSON.parse(cartData);
        if (parsedCartData && typeof parsedCartData === "object") {
          store.dispatch(setCart(parsedCartData));
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    }

    if (wishlistData) {
      try {
        const parsedWishlistData = JSON.parse(wishlistData);
        if (parsedWishlistData && typeof parsedWishlistData === "object") {
          store.dispatch(setWishlist(parsedWishlistData));
        }
      } catch (error) {
        console.error("Error parsing wishlist data from localStorage:", error);
      }
    }
  }
};
