import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, StyleProp, TextStyle } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { ThemedText } from "./themed-text";
interface ThemedButtonProps extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const ThemedButton = ({
  children,
  icon,
  textStyle,
  ...props
}: ThemedButtonProps) => {
  const { primary } = useTheme();

  return (
    <Pressable
      {...props}
      style={[
        {
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          backgroundColor: primary,
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
        },
      ]}
    >
      <ThemedText style={[{ color: "white" }, textStyle]}>
        {children}
      </ThemedText>
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={"white"}
        />
      )}
    </Pressable>
  );
};
export default ThemedButton;
