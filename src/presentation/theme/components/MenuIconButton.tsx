import { Ionicons } from "@expo/vector-icons";
import type { PropsWithChildren } from "react";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/use-theme";

interface MenuIconButtonProps extends PropsWithChildren {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const Styles = StyleSheet.create({});

const MenuIconButton = ({
  icon,
  onPress,
}: MenuIconButtonProps): React.JSX.Element => {
  const { primary } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={icon}
        size={25}
        color={primary}
      />
    </TouchableOpacity>
  );
};
export default MenuIconButton;
