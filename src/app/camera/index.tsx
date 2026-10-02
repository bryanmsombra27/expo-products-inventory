import { ThemedText } from "@/presentation/theme/components/themed-text";
import { useTheme } from "@/presentation/theme/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import * as ExpoMediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function CameaScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const requestPermissions = async () => {
    const cameraPermission = await requestPermission();

    if (cameraPermission.status !== PermissionStatus.GRANTED) {
      Alert.alert(
        "Permiso Requerido",
        "Es necesario que habilite el permiso de la camara para poder continuar...",
      );
      return;
    }

    const permission = await ExpoMediaLibrary.requestPermissionsAsync(false, [
      "photo",
    ]);
    if (permission.accessPrivileges == "none") {
      Alert.alert(
        "Permiso Requerido",
        "Es necesario que habilite el permiso de la galeria para poder continuar...",
      );
      return;
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          ...styles.container,
          marginHorizontal: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.message}>
          El permiso de la camara y la galeria es requerido{" "}
        </Text>
        <TouchableOpacity onPress={requestPermissions}>
          <ThemedText type="subtitle">Solicitar permiso</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (!picture.uri) return;

    setSelectedImage(picture.uri);
  };

  const returnCancel = () => {
    router.dismiss();
  };

  const pictureAccepted = async () => {
    if (!selectedImage) return;

    try {
      const asset = await ExpoMediaLibrary.Asset.create(selectedImage);
      Alert.alert("Exito", "foto guardada en la galeria");
    } catch (error) {
      Alert.alert("Error", "No fue posible guardar la foto en la galeria");
    }
  };
  const retakePhoto = () => {
    setSelectedImage("");
  };

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.camera}
          source={{
            uri: selectedImage,
          }}
        />
        <ConfirmImageButton onPress={pictureAccepted} />
        <RetakeImageButton onPress={retakePhoto} />
        <ReturnCancelButton onPress={returnCancel} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />
      <ShutterButton onPress={onShutterButtonPress} />

      <FlipCameraButton onPress={toggleCameraFacing} />
      <GalleryButton />
      <ReturnCancelButton onPress={returnCancel} />
    </View>
  );
}

// custom component
const ShutterButton = ({ onPress = () => {} }) => {
  const { width, height } = useWindowDimensions();
  const { primary } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: width / 2 - 32,
          borderColor: primary,
        },
      ]}
    ></TouchableOpacity>
  );
};
const ConfirmImageButton = ({ onPress = () => {} }) => {
  const { width, height } = useWindowDimensions();
  const { primary } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: width / 2 - 32,
          borderColor: primary,
        },
      ]}
    >
      <Ionicons
        name="checkmark-outline"
        size={30}
        color={primary}
      />
    </TouchableOpacity>
  );
};
const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.flipCameraButton}
    >
      <Ionicons
        size={30}
        name="camera-reverse-outline"
        color="white"
      />
    </TouchableOpacity>
  );
};
const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.galleryButton}
    >
      <Ionicons
        size={30}
        name="images-outline"
        color="white"
      />
    </TouchableOpacity>
  );
};
const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.flipCameraButton}
    >
      <Ionicons
        size={30}
        name="close-outline"
        color="white"
      />
    </TouchableOpacity>
  );
};
const ReturnCancelButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.returnCancelButton}
    >
      <Ionicons
        size={30}
        name="arrow-back-outline"
        color="white"
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    // borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
