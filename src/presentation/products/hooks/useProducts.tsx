import { getProducts } from "@/core/actions/products";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const useProducts = () => {
  const queryClient = useQueryClient();

  const { data, isPending, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: async (params) => {
      const pokemons = await getProducts({
        limit: 20,
        offset: params.pageParam * 20,
      });

      return pokemons;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => lastPageParam + 1,
    staleTime: 1000 * 60 * 60,
  });

  return {
    data: data?.pages.flat() ?? [],
    error,
    isPending,
    //funcion para obtener los siguientes registros (trigger manual)
    fetchNextPage,
  };
};
export default useProducts;
