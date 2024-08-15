import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-full"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
