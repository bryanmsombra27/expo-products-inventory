import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../hooks/use-theme";
interface ThemedTextInputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

const ThemedTextInput = ({
  icon,
  ...props
}: ThemedTextInputProps): React.JSX.Element => {
  const { primary, text } = useTheme();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={[
        {
          ...styles.border,
          borderColor: isFocus ? primary : "#ccc",
        },
      ]}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={text}
          style={{
            marginRight: 10,
          }}
        />
      )}
      <TextInput
        {...props}
        ref={inputRef}
        placeholderTextColor={"#5c5c5c"}
        onFocus={(e) => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={{
          color: text,
          marginRight: 10,
          flex: 1,
        }}
      />
    </View>
  );
};
export default ThemedTextInput;
