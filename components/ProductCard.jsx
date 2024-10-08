import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Heart, Star, ImageOff } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/lib/features/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/features/wishlistSlice";

const FallbackImage = () => (
  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <ImageOff className="w-12 h-12 text-primary mx-auto mb-2" />
      <p className="text-sm text-gray-500">Image unavailable</p>
    </div>
  </div>
);

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const isLiked = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[1],
      })
    );
    toast.success(`${product.title} added to cart!`);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from favorites");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to favorites");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="relative group">
        {imageError ? (
          <FallbackImage />
        ) : (
          <Image
            src={product.images[1]}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            priority
          />
        )}
        <button
          onClick={handleLike}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100"
        >
          <Heart
            className={`w-6 h-6 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
          {product.category?.name || "Uncategorized"}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
          {product.title}
        </h2>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">4.5 (120 reviews)</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className={`py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isAdding
                ? "bg-green-500 text-white"
                : "bg-primary text-white hover:bg-opacity-90"
            } shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
            disabled={isAdding}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isAdding ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
