"use client";

import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { CreditCard, Mail, Home, User, MapPin, Lock } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { clearCart } from "@/lib/features/cartSlice";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zipCode: z.string().regex(/^\d{5}$/, "Invalid ZIP code"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3}$/, "Invalid CVV"),
});

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      checkoutSchema.parse(formData);
      // TODO: Process payment and complete order here
      toast.success("Order placed successfully!");
      dispatch(clearCart());
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const InputField = ({ name, label, icon: Icon, type = "text" }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping & Payment
              </h2>
              <form onSubmit={handleSubmit}>
                <InputField name="fullName" label="Full Name" icon={User} />
                <InputField
                  name="email"
                  label="Email"
                  icon={Mail}
                  type="email"
                />
                <InputField name="address" label="Address" icon={Home} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField name="city" label="City" icon={MapPin} />
                  <InputField name="zipCode" label="ZIP Code" icon={MapPin} />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Details
                  </h3>
                  <InputField
                    name="cardNumber"
                    label="Card Number"
                    icon={CreditCard}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      name="expiryDate"
                      label="Expiry Date"
                      icon={CreditCard}
                    />
                    <InputField name="cvv" label="CVV" icon={Lock} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="rounded-md"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium text-gray-900">
                    ${cart.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Shipping</p>
                  <p className="font-medium text-gray-900">Free</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Taxes</p>
                  <p className="font-medium text-gray-900">
                    ${(cart.totalAmount * 0.1).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-primary">
                    ${(cart.totalAmount * 1.1).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
