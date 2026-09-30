import ProductImages from "@/presentation/products/components/ProductImages";
import useProduct from "@/presentation/products/hooks/useProduct";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface ProductIdProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const ProductId = ({}: ProductIdProps): React.JSX.Element => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data, error, isPending } = useProduct(id.toString());

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="camera-outline"
          size={25}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (data?.title) {
      navigation.setOptions({
        title: data.title,
      });
    }
  }, [data]);

  if (isPending)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );

  if (!data) return <Redirect href={"/(products-app)/(home)"} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages images={data.images} />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Titulo..."
            style={{
              marginVertical: 6,
            }}
          />
          <ThemedTextInput
            placeholder="Slug..."
            style={{
              marginVertical: 6,
            }}
          />
          <ThemedTextInput
            placeholder="Description..."
            multiline
            numberOfLines={5}
            style={{
              marginVertical: 6,
            }}
          />
        </ThemedView>

        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput
            placeholder="Precio..."
            keyboardType="decimal-pad"
            style={{
              flex: 1,
            }}
          />
          <ThemedTextInput
            placeholder="Inventario..."
            keyboardType="number-pad"
            style={{
              flex: 1,
            }}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default ProductId;
