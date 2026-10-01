import type { PropsWithChildren } from "react";
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

interface ProductImagesProps extends PropsWithChildren {
  images: string[];
}

const Styles = StyleSheet.create({});

const ProductImages = ({ images }: ProductImagesProps): React.JSX.Element => {
  if (images.length == 0)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/images/no-product-image.png")}
          style={{
            width: 300,
            height: 300,
          }}
        />
      </View>
    );

  return (
    <FlatList
      data={images}
      keyExtractor={(image) => image}
      renderItem={({ item }) => (
        <Image
          source={{
            uri: item,
          }}
          style={{
            width: 300,
            height: 300,
            marginHorizontal: 7,
            borderRadius: 5,
          }}
        />
      )}
      horizontal
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ProductImages;
