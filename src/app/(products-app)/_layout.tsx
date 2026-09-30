import LogOutIconButton from "@/presentation/auth/components/LogOutIconButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { Redirect, Stack } from "expo-router";
import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface layoutProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const CheckAuthenticationLayout = ({}: layoutProps): React.JSX.Element => {
  const { checkStatus, status } = useAuthStore();
  const { background } = useTheme();

  useEffect(() => {
    checkStatus();
  }, []);

  if (status == "checking")
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );

  if (status == "unathenticated") return <Redirect href={"/auth/login"} />;
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: background },
          contentStyle: { backgroundColor: background },
        }}
      >
        <Stack.Screen
          name="/"
          options={{
            title: "Productos",
            headerTitle: "Productos",
            headerLeft: () => <LogOutIconButton />,
            headerRight: () => <LogOutIconButton />,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Producto",
            headerTitle: "Producto",
            headerLeft: () => <LogOutIconButton />,
            headerRight: () => <LogOutIconButton />,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};
export default CheckAuthenticationLayout;
