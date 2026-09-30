import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  Slot,
  SplashScreen,
  ThemeProvider,
} from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { background } = useTheme();

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
  }

  return (
    <GestureHandlerRootView
    // style={{
    //   backgroundColor: background,
    // }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
