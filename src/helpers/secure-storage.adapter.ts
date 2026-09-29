import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      Alert.alert("Error Storage", "Error al guardar los datos en storage");
    }
  }

  static async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      Alert.alert("Error Storage", "Error al obtener los datos del storage");
    }
  }

  static async deleteItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      Alert.alert("Error Storage", "Error al eliminar los datos del storage");
    }
  }
}
