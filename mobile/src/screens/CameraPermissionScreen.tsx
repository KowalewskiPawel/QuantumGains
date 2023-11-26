import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { backgroundImage } from "../assets";
import { Button, useTheme } from "react-native-paper";

export const CameraPermissionScreen = () => {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.textBackground}>
            <Text style={styles.title}>QuantumGains</Text>
          </View>
          <View style={styles.textBackground}>
            <Text style={styles.text}>
              Permission Not Granted - {permission?.status}
            </Text>
          </View>
          <StatusBar style="auto" />
          <Button
            icon="shield-key"
            mode="contained"
            onPress={requestPermission}
            style={{ marginTop: 10 }}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            Request Permission
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    backgroundColor: "#121212", // Dark background
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: "#1A1A1A",
    borderRadius: 25,
    color: "#FFFFFF",
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
  },
  textBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    paddingVertical: 5, // Adjust the padding as needed
    paddingHorizontal: 10, // Adjust the padding as needed
    borderRadius: 10, // Gives rounded corners
    alignSelf: "center", // Centers the background on the text
    marginBottom: 5, // Space below the text
  },
  text: {
    color: "#FFFFFF", // White text
    fontWeight: "bold",
  },
  title: {
    color: "#FFFFFF", // White text color for contrast
    fontSize: 32, // Larger font size for prominence
    fontWeight: "900", // Extra bold font weight
    textTransform: "uppercase", // Uppercase letters for a more impactful look
    letterSpacing: 2, // Spacing out the letters for a more refined appearance
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Text shadow for depth
    textShadowOffset: { width: 2, height: 2 }, // Positioning of the text shadow
    textShadowRadius: 3, // Blurring the shadow for a softer look
    marginBottom: 10, // Space below the title
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
    borderColor: "#FFFFFF", // Border color for the image
    borderWidth: 2,
    borderRadius: 10, // Optional: if you want rounded corners
  },
  uploadingStatus: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  uploadSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
