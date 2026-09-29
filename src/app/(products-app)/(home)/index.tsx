import { StyleSheet } from "react-native";

import LogOutIconButton from "@/presentation/auth/components/LogOutIconButton";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import { ThemedView } from "@/presentation/theme/components/themed-view";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <LogOutIconButton />
      <ThemedText style={{ fontFamily: "kanitBold" }}>
        Index component page
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
});
