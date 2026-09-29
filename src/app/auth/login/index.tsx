import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLinkt from "@/presentation/theme/components/ThemedLinkt";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { router } from "expo-router";
import { useState, type PropsWithChildren } from "react";
import {
  Alert,
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
  const { login } = useAuthStore();
  const { background } = useTheme();
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const submit = async () => {
    setIsPosting(true);
    if (form.email.length == 0 || form.password.length == 0) {
      setIsPosting(false);

      return;
    }

    const success = await login(form.email, form.password);
    setIsPosting(false);
    if (success) {
      router.replace("/");
      return;
    }
    Alert.alert("Error", "Credenciales invalidas");
  };

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
            value={form.email}
            onChangeText={(val) =>
              setForm((state) => ({
                ...state,
                email: val,
              }))
            }
          />
          <ThemedTextInput
            placeholder="password..."
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(val) =>
              setForm((state) => ({
                ...state,
                password: val,
              }))
            }
          />
        </View>

        <ThemedButton
          icon="arrow-up-right-box"
          disabled={isPosting}
          style={isPosting && { pointerEvents: "none" }}
          onPress={submit}
        >
          Ingresar
        </ThemedButton>

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
