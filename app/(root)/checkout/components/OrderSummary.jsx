import Image from "next/image";

export default function OrderSummary({ cart }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Order Summary
        </h2>
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
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
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
  );
}
