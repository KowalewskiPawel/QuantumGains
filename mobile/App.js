import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "./firebase-config";
import { useState } from "react";

export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadingStatus, setUploadingStatus] = useState();

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();
        const uploadResp = await uploadToFirebase(uri, fileName, (currentUploadStatus) =>
          setUploadingStatus(Math.floor(currentUploadStatus).toString())
        );
        const { downloadUrl } = uploadResp;

        setUploadedImage(downloadUrl);
        setUploadingStatus(null);
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
    }
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission}></Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>QuantumGains</Text>
        {uploadingStatus && <Text>Uploading in progress: {uploadingStatus} %</Text>}
        {uploadedImage &&
          <View>
            <Text>Uploaded Image</Text>
            <Image
              style={styles.image}
              source={{
                uri: uploadedImage,
              }}
            />
          </View>
        }
        <StatusBar style="dark" />
        <Button title={`${uploadedImage ? "Re-" : ""}Take Picture`} onPress={takePhoto}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 400
  },
  title: {
    fontSize: 18,
    fontWeight: 600
  },
});