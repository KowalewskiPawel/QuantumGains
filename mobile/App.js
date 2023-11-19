import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { FitnessPlan, LoadingSpinner, CustomButton } from "./components";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "./firebase-config";
import { useState } from "react";

const backgroundImage = require('./assets/background-image-1.png');

export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadingStatus, setUploadingStatus] = useState();
  const [photoAnalysisData, setPhotoAnalysisData] = useState();
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const requestPhotoAnalysis = async () => {
    setIsAnalysisLoading(true);
    try {
      const photoAnalysisResponse = await fetch("https://quantumgains-production.up.railway.app/api/v1/llava/analyze-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoUrl: uploadedImage,
          isMockRequest: true
        }),
      });
      const photoAnalysisResponseData = await photoAnalysisResponse.json();
      setPhotoAnalysisData(photoAnalysisResponseData);
    } catch (e) {
      Alert.alert("Error Analyzing Photo " + e.message);
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  const loginUser = () => {
    setIsLogged(true);
  };


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

  if (!isLogged) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.textBackground}>
                <Text style={styles.title}>QuantumGains</Text>
              </View>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#cccccc"
                style={styles.input}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#cccccc"
                secureTextEntry
                style={styles.input}
              />
              <CustomButton title="Login" onPress={loginUser} />
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    )
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.textBackground}>
              <Text style={styles.title}>QuantumGains</Text>
            </View>
            <View style={styles.textBackground}>
              <Text style={styles.text}>Permission Not Granted - {permission?.status}</Text>
            </View>
            <StatusBar style="auto" />
            <CustomButton title="Request Permission" onPress={requestPermission} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.textBackground}>
              <Text style={styles.title}>QuantumGains</Text>
            </View>
            {uploadingStatus &&
              <View>
                <View style={styles.textBackground}>
                  <Text style={styles.uploadingStatus}>Uploading in progress: {uploadingStatus} %</Text>
                </View>
                <LoadingSpinner />
              </View>}
            {uploadedImage &&
              <View>
                <View style={styles.textBackground}>
                  <Text style={styles.uploadingStatus}>Uploaded Image</Text>
                </View>
                <Image
                  style={styles.image}
                  source={{
                    uri: uploadedImage,
                  }}
                />
              </View>
            }
            <StatusBar style="auto" />
            {!uploadingStatus && <CustomButton title={`${uploadedImage ? "Re-" : ""}Take Picture`} onPress={takePhoto} />}
            {uploadedImage && <CustomButton title="Analyze Photo" onPress={requestPhotoAnalysis} />}
            {isAnalysisLoading && <LoadingSpinner />}
            {photoAnalysisData && <FitnessPlan data={photoAnalysisData} />}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    backgroundColor: "#121212", // Dark background
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
  },
  textBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    paddingVertical: 5, // Adjust the padding as needed
    paddingHorizontal: 10, // Adjust the padding as needed
    borderRadius: 10, // Gives rounded corners
    alignSelf: 'center', // Centers the background on the text
    marginBottom: 5, // Space below the text
  },
  text: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold', // If you want the text to be bold
    // ... any other text styling you need ...
  },
  title: {
    color: '#FFFFFF', // White text color for contrast
    fontSize: 32, // Larger font size for prominence
    fontWeight: '900', // Extra bold font weight
    textTransform: 'uppercase', // Uppercase letters for a more impactful look
    letterSpacing: 2, // Spacing out the letters for a more refined appearance
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Text shadow for depth
    textShadowOffset: { width: 2, height: 2 }, // Positioning of the text shadow
    textShadowRadius: 3, // Blurring the shadow for a softer look
    marginBottom: 10, // Space below the title
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
    borderColor: '#FFFFFF', // Border color for the image
    borderWidth: 2,
    borderRadius: 10, // Optional: if you want rounded corners
  },
  uploadingStatus: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  uploadSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
