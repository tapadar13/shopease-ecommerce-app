"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const total = searchParams.get("total");

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-semibold text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-semibold text-gray-900">${total}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 mb-4">
            We&apos;ve sent a confirmation email with order details to your
            email address.
          </p>
          <Link
            href="/"
            className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
