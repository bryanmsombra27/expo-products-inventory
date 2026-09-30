import type { PropsWithChildren } from "react";
import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";

interface ProductImagesProps extends PropsWithChildren {
  images: string[];
}

const Styles = StyleSheet.create({});

const ProductImages = ({ images }: ProductImagesProps): React.JSX.Element => {
  if (images.length == 0)
    return (
      <Image
        source={require("../../../../assets/images/no-product-image.png")}
        style={{
          width: 300,
          height: 300,
        }}
      />
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
