"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { removeFromCart, applyDiscount } from "@/lib/features/cartSlice";

export default function CartPage() {
  const [discountCode, setDiscountCode] = useState("");
  const [showClearCartConfirm, setShowClearCartConfirm] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleApplyDiscount = () => {
    if (discountCode === "SUMMER10") {
      dispatch(applyDiscount({ type: "percentage", value: 10 }));
      toast.success("10% discount applied!");
    } else if (discountCode === "FLAT20") {
      dispatch(applyDiscount({ type: "fixed", value: 20 }));
      toast.success("$20 discount applied!");
    } else {
      toast.error("Invalid discount code");
    }
    setDiscountCode("");
  };

  const handleClearCart = () => {
    setShowClearCartConfirm(true);
  };

  const handleCheckout = () => {
    toast.success("Checkout successful!");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl text-gray-800 font-bold mb-8 text-center">
        Your Shopping Cart
      </h1>
      {cart.items.length === 0 ? (
        <div className="text-center bg-white rounded-xl shadow-lg p-12">
          <ShoppingBag className="w-24 h-24 mx-auto text-primary mb-6" />
          <p className="text-xl mb-6 text-gray-600">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-primary font-medium">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                      <button className="p-1 rounded-full bg-white hover:bg-gray-200 transition-colors duration-300">
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold text-gray-800 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button className="p-1 rounded-full bg-white hover:bg-gray-200 transition-colors duration-300">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300 p-2 rounded-full hover:bg-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleClearCart}
              className="mt-6 text-red-500 hover:text-red-700 transition-colors duration-300 flex items-center"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear Cart
            </button>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ${cart.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-green-600">
                    -${cart.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-primary">
                    ${(cart.totalAmount - cart.discount).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="discountCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Discount Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="discountCode"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-grow border-2 border-r-0 border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-prima-primary focus:border-transparent"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <Link href="/checkout">
                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {showClearCartConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Clear Cart
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all items from your cart?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowClearCartConfirm(false)}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement clear cart logic here
                  setShowClearCartConfirm(false);
                  toast.success("Cart cleared successfully");
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
