import { getProductById } from "@/core/actions/products";
import { useQuery } from "@tanstack/react-query";

const useProduct = (id: string) => {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["producto", id],
    enabled: !!id,
    staleTime: 60 * 60 * 1000, //1h
  });

  return {
    data,
    error,
    isPending,
    isFetching,
    refetch,
  };
};
export default useProduct;
