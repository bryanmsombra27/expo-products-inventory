import type { PropsWithChildren } from "react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface indexProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const index = ({}: indexProps): React.JSX.Element => {
  return (
    <View>
      <Text> index View Component </Text>
    </View>
  );
};
export default index;
