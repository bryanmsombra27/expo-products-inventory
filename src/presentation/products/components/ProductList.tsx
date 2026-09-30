import { Product } from "@/core/interfaces/product";
import { useQueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { ProductCard } from "./ProductCard";

interface ProductListProps extends PropsWithChildren {
  products: Product[];
  loadNextPage: () => void;
}

const Styles = StyleSheet.create({});

const ProductList = ({
  loadNextPage,
  products,
}: ProductListProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const onPullRequest = async () => {
    setIsLoading(true);
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(product) => product.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onPullRequest}
        />
      }
    />
  );
};
export default ProductList;
