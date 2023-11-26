import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { backgroundImage } from "../assets";
import { Button, useTheme } from "react-native-paper";
import { styles } from "../styles/globalStyles";

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
