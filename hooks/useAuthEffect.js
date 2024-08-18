import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/nextjs";
import * as cartActions from "@/lib/features/cartSlice";
import * as wishlistActions from "@/lib/features/wishlistSlice";
import { mergeUserData } from "@/lib/features/mergeUserData";

export const useAuthEffect = () => {
  const dispatch = useDispatch();
  const { isLoaded, isSignedIn } = useAuth();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const mergedRef = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !mergedRef.current) {
      console.log("Before merge - Cart:", cart);
      console.log("Before merge - Wishlist:", wishlist);

      const guestData = { cart, wishlist };
      // Here, you would typically fetch the user's data from your backend
      // For this example, we're using empty data
      const userData = {
        cart: {
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
          discount: 0,
          appliedDiscount: null,
        },
        wishlist: { items: [] },
      };

      const mergedData = mergeUserData(guestData, userData);

      console.log("After merge - Cart:", mergedData.cart);
      console.log("After merge - Wishlist:", mergedData.wishlist);

      dispatch(cartActions.setCart(mergedData.cart));
      dispatch(wishlistActions.setWishlist(mergedData.wishlist));

      mergedRef.current = true;
    }
  }, [isLoaded, isSignedIn, dispatch, cart, wishlist]);

  useEffect(() => {
    if (!isSignedIn) {
      mergedRef.current = false;
    }
  }, [isSignedIn]);
};
