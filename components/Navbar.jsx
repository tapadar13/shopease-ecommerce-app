import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ShopEase
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </Link>
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
