import type { PropsWithChildren } from "react";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/use-theme";

interface ThemedButtonGroupProps extends PropsWithChildren {
  options: string[];
  selectedOptions: string[];
  onSelect: (options: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#fff",
  },
});

const ThemedButtonGroup = ({
  onSelect,
  options,
  selectedOptions,
}: ThemedButtonGroupProps): React.JSX.Element => {
  const { primary } = useTheme();

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedOptions.includes(option) && { backgroundColor: primary },
          ]}
          onPress={() => {
            onSelect(option);
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              styles.buttonText,
              selectedOptions.includes(option) && styles.selectedButtonText,
            ]}
          >
            {/* {option[0].toUpperCase() + option.slice(1)} */}
            {option[0].toUpperCase() + option.substring(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default ThemedButtonGroup;
