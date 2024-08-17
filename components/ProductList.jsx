"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductFilters from "./ProductFilters";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products?limit=25"
        );
        setProducts(response.data.slice(1, 25));
        setFilteredProducts(response.data.slice(1, 25));
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
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category.name.toLowerCase() === category.toLowerCase()
      );
    }

    // Sorting
    switch (sortBy) {
      case "priceLowToHigh":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameZA":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setFilteredProducts(result);
  }, [searchTerm, products, category, sortBy]);

  const handleFilterChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <ProductFilters
        category={category}
        sortBy={sortBy}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => <ProductCardSkeleton key={index} />)
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
