import { Link, LinkProps } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/use-theme";

interface ThemedLinktProps extends LinkProps {}

const Styles = StyleSheet.create({});

const ThemedLinkt = ({
  children,
  style,
  ...props
}: ThemedLinktProps): React.JSX.Element => {
  const { primary } = useTheme();

  return (
    <Link
      style={[
        {
          color: primary,
        },
        style,
      ]}
      {...props}
    >
      <Text> {children} </Text>
    </Link>
  );
};
export default ThemedLinkt;
