import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchProducts = async () => {
  const response = await axios.get(
    "https://api.escuelajs.co/api/v1/products?limit=33"
  );
  return response.data.slice(1, 33);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onError: () => toast.error("Failed to fetch products"),
  });
};
