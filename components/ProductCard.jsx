"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";
import { addToCart } from "@/lib/features/cartSlice";

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      })
    );
    toast.success(`${product.title} added to cart!`);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={150}
        height={150}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className={`bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-full transition-colors ${
            isAdding ? "bg-green-500" : "hover:bg-blue-700"
          }`}
          disabled={isAdding}
        >
          <FaShoppingCart className="mr-2" />
          {isAdding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
