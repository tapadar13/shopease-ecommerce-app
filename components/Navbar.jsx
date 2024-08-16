"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Heart } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);
  const wishlistItemsCount = useSelector(
    (state) => state.wishlist.items.length
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(debouncedSearchTerm.trim())}`);
    }
  }, [debouncedSearchTerm]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopEase
          </Link>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/wishlist"
              className="relative text-gray-600 hover:text-primary"
            >
              <Heart className="h-6 w-6" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-primary"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 hover:text-primary">
                  Hi, {user.firstName}
                </span>
                <SignOutButton
                  signOutCallback={() => {
                    router.push("/sign-in");
                    toast.success("You have been successfully signed out.");
                  }}
                >
                  <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-gray-600 hover:text-primary"
                >
                  <User className="h-6 w-6" />
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
