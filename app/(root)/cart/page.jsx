"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { removeFromCart } from "@/lib/features/cartSlice";

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic here
    toast.success("Checkout successful!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link href="/" className="text-blue-600 underline">
            Start shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4 last:border-b-0"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    ${cart.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
