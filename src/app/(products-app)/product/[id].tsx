import { useLocalSearchParams } from "expo-router";
import type { PropsWithChildren } from "react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductIdProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const ProductId = ({}: ProductIdProps): React.JSX.Element => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text> ProductId View Component </Text>
    </View>
  );
};
export default ProductId;
