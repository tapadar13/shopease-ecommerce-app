import { CreditCard, Mail, Home, User, MapPin, Lock } from "lucide-react";

const InputField = ({
  name,
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  error,
}) => (
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
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default function CheckoutForm({
  formData,
  errors,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Shipping & Payment
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            name="fullName"
            label="Full Name"
            icon={User}
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            name="email"
            label="Email"
            icon={Mail}
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            name="address"
            label="Address"
            icon={Home}
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="city"
              label="City"
              icon={MapPin}
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            <InputField
              name="zipCode"
              label="ZIP Code"
              icon={MapPin}
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Payment Details
            </h3>
            <InputField
              name="cardNumber"
              label="Card Number"
              icon={CreditCard}
              value={formData.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="expiryDate"
                label="Expiry Date"
                icon={CreditCard}
                value={formData.expiryDate}
                onChange={handleChange}
                error={errors.expiryDate}
              />
              <InputField
                name="cvv"
                label="CVV"
                icon={Lock}
                value={formData.cvv}
                onChange={handleChange}
                error={errors.cvv}
              />
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
  );
}
