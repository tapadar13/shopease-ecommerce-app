"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearCart } from "@/lib/features/cartSlice";
import { useCheckoutForm } from "@/hooks/useCheckOutForm";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const { formData, errors, handleChange, validateForm } = useCheckoutForm({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      router.push(
        `/thank-you?orderNumber=${orderNumber}&total=${(
          cart.totalAmount * 1.1
        ).toFixed(2)}`
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CheckoutForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
