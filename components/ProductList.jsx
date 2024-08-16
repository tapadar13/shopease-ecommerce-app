"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products?limit=25"
        );
        setProducts(response.data.slice(1, 25));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? Array(8)
            .fill()
            .map((_, index) => <ProductCardSkeleton key={index} />)
        : displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
