import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLinkt from "@/presentation/theme/components/ThemedLinkt";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useTheme } from "@/presentation/theme/hooks/use-theme";
import type { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

interface indexProps extends PropsWithChildren {}

const Styles = StyleSheet.create({});

const index = ({}: indexProps) => {
  const { height } = useWindowDimensions();
  const { background } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: background }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 40,
          flex: 1,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor, ingrese para continuar...
          </ThemedText>
        </View>

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="email..."
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="password..."
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>

        <ThemedButton icon="arrow-up-right-box">Ingresar</ThemedButton>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <ThemedText>¿No tienes cuenta?</ThemedText>
          <ThemedLinkt
            href={"/auth/register"}
            style={{
              marginHorizontal: 5,
            }}
          >
            Crear cuenta
          </ThemedLinkt>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default index;
