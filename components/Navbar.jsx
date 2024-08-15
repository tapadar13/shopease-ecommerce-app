"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/sign-in");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ShopEase
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.firstName}</span>
              <SignOutButton signOutCallback={handleSignOut}>
                <button className="bg-white text-blue-600 px-4 py-2 rounded">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
