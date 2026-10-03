import { Size } from "@/core/interfaces/product";
import ProductImages from "@/presentation/products/components/ProductImages";
import useCreateProduct from "@/presentation/products/hooks/useCreateProduct";
import useProduct from "@/presentation/products/hooks/useProduct";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import MenuIconButton from "@/presentation/theme/components/MenuIconButton";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Formik } from "formik";
import type { PropsWithChildren } from "react";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface ProductIdProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const ProductId = ({}: ProductIdProps): React.JSX.Element => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data, error, isPending, isFetching, refetch } = useProduct(`${id}`);
  const productIdRef = useRef<string>(`${id}`);
  const { mutateAsync } = useCreateProduct(productIdRef);
  const { selectedImages, clearImages } = useCameraStore();

  useEffect(() => {
    return () => {
      clearImages();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push("/camera")}
          icon="camera-outline"
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
    <Formik
      initialValues={data}
      onSubmit={async (val) =>
        await mutateAsync({
          ...val,
          id: productIdRef.current,
          images: [...val.images, ...selectedImages],
        })
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : undefined}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={async () => {
                  await refetch();
                }}
              />
            }
          >
            <ProductImages images={[...data.images, ...selectedImages]} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Titulo..."
                style={{
                  marginVertical: 6,
                }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug..."
                style={{
                  marginVertical: 6,
                }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemedTextInput
                placeholder="Description..."
                multiline
                numberOfLines={5}
                style={{
                  marginVertical: 6,
                }}
                value={values.description}
                onChangeText={handleChange("description")}
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
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemedTextInput
                placeholder="Inventario..."
                keyboardType="number-pad"
                style={{
                  flex: 1,
                }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView style={{ marginHorizontal: 10 }}>
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXL"]}
                selectedOptions={values.sizes}
                onSelect={(option) => {
                  const newSizeValue = values.sizes.includes(option as Size)
                    ? values.sizes.filter((size) => size !== option)
                    : [...values.sizes, option];

                  setFieldValue("sizes", newSizeValue);
                }}
              ></ThemedButtonGroup>

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(option) => {
                  setFieldValue("gender", option);
                }}
              ></ThemedButtonGroup>
            </ThemedView>

            <View>
              <ThemedButton
                icon="save-outline"
                style={{
                  marginHorizontal: 10,
                  marginBottom: 50,
                  marginTop: 20,
                }}
                onPress={() => handleSubmit()}
              >
                Guardar
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
export default ProductId;
