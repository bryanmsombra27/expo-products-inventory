import { createUpdateProduct } from "@/core/actions/products";
import { Product } from "@/core/interfaces/product";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefObject } from "react";
import { Alert } from "react-native";

const useCreateProduct = (ref: RefObject<string>) => {
  const queryClient = useQueryClient();
  const { clearImages } = useCameraStore();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: createUpdateProduct,
    onSuccess: async (value: Product) => {
      ref.current = value.id;
      clearImages();
      queryClient.invalidateQueries({ queryKey: ["product", value.id] });
      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
      Alert.alert("Producto Creado", "Producto creado correctamente");
    },
    onError: () => {
      Alert.alert("Error del Producto", "No fue posible crear el producto");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useCreateProduct;
