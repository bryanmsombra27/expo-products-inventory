import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import type { PropsWithChildren } from "react";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

interface LogOutIconButtonProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const LogOutIconButton = ({}: LogOutIconButtonProps): React.JSX.Element => {
  const { primary } = useTheme();
  const { logOut } = useAuthStore();

  return (
    <TouchableOpacity
      style={{
        marginRight: 8,
      }}
      onPress={logOut}
    >
      <Ionicons
        name="log-out-outline"
        color={primary}
        size={24}
      />
    </TouchableOpacity>
  );
};
export default LogOutIconButton;
