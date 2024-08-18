"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductFilters from "./ProductFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";

export default function ProductList() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: products, isLoading, error } = useProducts();

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Search filter
    if (debouncedSearchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category.name.toLowerCase().trim() ===
          category.toLowerCase().trim()
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

    return result;
  }, [products, debouncedSearchTerm, category, sortBy]);

  const handleFilterChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to fetch products. please try again later.
      </div>
    );
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
        {isLoading
          ? Array(8)
              .fill()
              .map((_, index) => <ProductCardSkeleton key={index} />)
          : filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
