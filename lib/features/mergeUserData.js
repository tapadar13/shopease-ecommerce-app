export const mergeUserData = (guestData, userData) => {
  console.log("Merging - Guest Data:", guestData);
  console.log("Merging - User Data:", userData);

  const mergedCart = {
    items: [...(guestData.cart?.items || []), ...(userData.cart?.items || [])],
    totalQuantity:
      (guestData.cart?.totalQuantity || 0) +
      (userData.cart?.totalQuantity || 0),
    totalAmount:
      (guestData.cart?.totalAmount || 0) + (userData.cart?.totalAmount || 0),
    discount: Math.max(
      guestData.cart?.discount || 0,
      userData.cart?.discount || 0
    ),
    appliedDiscount:
      guestData.cart?.appliedDiscount || userData.cart?.appliedDiscount || null,
  };

  const mergedWishlist = {
    items: [
      ...new Set([
        ...(guestData.wishlist?.items || []),
        ...(userData.wishlist?.items || []),
      ]),
    ],
  };

  console.log("Merged Cart:", mergedCart);
  console.log("Merged Wishlist:", mergedWishlist);

  return {
    cart: mergedCart,
    wishlist: mergedWishlist,
  };
};
