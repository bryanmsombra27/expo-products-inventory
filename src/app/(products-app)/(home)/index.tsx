import { ActivityIndicator, StyleSheet } from "react-native";

import LogOutIconButton from "@/presentation/auth/components/LogOutIconButton";
import ProductList from "@/presentation/products/components/ProductList";
import useProducts from "@/presentation/products/hooks/useProducts";
import { FAB } from "@/presentation/theme/components/FAB";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import { router } from "expo-router";

export default function HomeScreen() {
  const { data, error, isPending, fetchNextPage } = useProducts();

  if (isPending)
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={30} />
      </ThemedView>
    );

  if (error)
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No fue posible cargar los productos</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.container}>
      <LogOutIconButton />
      <ProductList
        products={data ?? []}
        loadNextPage={fetchNextPage}
      />

      <FAB
        iconName="add-outline"
        onPress={() => {
          router.push("/(products-app)/product/new");
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
