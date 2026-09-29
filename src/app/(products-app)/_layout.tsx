import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface layoutProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const CheckAuthenticationLayout = ({}: layoutProps): React.JSX.Element => {
  const { checkStatus, status } = useAuthStore();

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
      <Stack>
        <Stack.Screen
          name="/"
          options={{ title: "Productos" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};
export default CheckAuthenticationLayout;
