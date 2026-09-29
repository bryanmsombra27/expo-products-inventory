import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  Slot,
  SplashScreen,
  ThemeProvider,
} from "expo-router";
import { useEffect } from "react";
import { Text, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    kanitBold: require("../../assets/fonts/Kanit-Bold.ttf"),
    kanitRegular: require("../../assets/fonts/Kanit-Regular.ttf"),
    kanitThin: require("../../assets/fonts/Kanit-Thin.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      console.log(error, "ERROR AL CARGAR FUENTES");
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    SplashScreen.hideAsync();
    return <Text style={{ fontSize: 300 }}>Keso</Text>;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
