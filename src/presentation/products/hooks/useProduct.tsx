import { getProductById } from "@/core/actions/products";
import { useQuery } from "@tanstack/react-query";

const useProduct = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["producto", id],
    enabled: !!id,
    staleTime: 60 * 60 * 1000, //1h
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useProduct;
