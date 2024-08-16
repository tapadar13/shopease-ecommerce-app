"use client";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { ShoppingCart, Trash2, X, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  removeFromWishlist,
  clearWishlist,
} from "@/lib/features/wishlistSlice";
import { addToCart } from "@/lib/features/cartSlice";

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Item removed from wishlist");
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared");
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[1],
      })
    );
    dispatch(removeFromWishlist(product.id));
    toast.success(`${product.title} added to cart and removed from wishlist!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Wishlist
          </button>
        )}
      </div>
      {wishlistItems.length === 0 ? (
        <div className="text-center bg-white rounded-xl shadow-lg p-12">
          <Heart className="w-24 h-24 mx-auto text-primary mb-6" />
          <p className="text-xl mb-6 text-gray-600">Your wishlist is empty.</p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Discover products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="relative">
                <Image
                  src={product.images[1]}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-2xl font-semibold text-primary mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-opacity-90 transition duration-300"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
