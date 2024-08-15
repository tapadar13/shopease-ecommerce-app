import { useState, useCallback, useRef } from "react";
import { z } from "zod";

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

export const useCheckoutForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const debounceTimerRef = useRef(null);

  const validateField = useCallback((name, value) => {
    try {
      checkoutSchema.pick({ [name]: true }).parse({ [name]: value });
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Invalid input";
    }
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear previous debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new debounce timer
      debounceTimerRef.current = setTimeout(() => {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }, 300);
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    try {
      checkoutSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  return { formData, errors, handleChange, validateForm };
};
