import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FitnessPlan, LoadingSpinner, CustomButton } from "../components";
import { backgroundImage } from "../assets";
import { Button, useTheme } from "react-native-paper";
import apiClient from "../api/apiClient";
import { uploadToFirebase } from "../firebase/firebase-config";
import { styles } from "../styles/globalStyles";

export const PhotoAnalysisScreen = () => {
  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  const [uploadingStatus, setUploadingStatus] = useState<string | undefined>();
  const [photoAnalysisData, setPhotoAnalysisData] = useState();
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const theme = useTheme();

  const requestPhotoAnalysis = async () => {
    setIsAnalysisLoading(true);
    setIsError(false);
    try {
      const photoAnalysisResponseData = await apiClient.post(
        "/llava/analyze-photo",
        { photoUrl: uploadedImage }
      );

      if (
        photoAnalysisResponseData.error ||
        photoAnalysisResponseData.fatLevel === undefined ||
        photoAnalysisResponseData.trainingProgramList === undefined ||
        photoAnalysisResponseData.diet === undefined
      ) {
        setIsError(true);
        throw new Error(photoAnalysisResponseData.error);
      } else {
        setPhotoAnalysisData(photoAnalysisResponseData);
      }
    } catch (e) {
      Alert.alert("Error Analyzing Photo " + e.message);
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.4,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();

        type UploadResponse = {
          downloadUrl: string;
        };

        const uploadResp = await uploadToFirebase(
          uri,
          fileName,
          (currentUploadStatus) =>
            setUploadingStatus(Math.floor(currentUploadStatus).toString())
        );
        const { downloadUrl } = uploadResp as UploadResponse;

        setUploadedImage(downloadUrl as string);
        setUploadingStatus(null);
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.textBackground}>
              <Text style={styles.title}>QuantumGains</Text>
            </View>
            {uploadingStatus && (
              <View>
                <View style={styles.textBackground}>
                  <Text style={styles.uploadingStatus}>
                    Uploading in progress: {uploadingStatus} %
                  </Text>
                </View>
                <LoadingSpinner />
              </View>
            )}
            {uploadedImage && (
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
            )}
            <StatusBar style="auto" />
            {!uploadingStatus && (
              <Button
                icon="camera"
                mode="contained"
                onPress={takePhoto}
                style={{ marginTop: 10 }}
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}
              >
                {`${uploadedImage ? "Re-" : ""}Take Picture`}
              </Button>
            )}
            {uploadedImage && (
              <CustomButton
                title="Analyze Photo"
                onPress={requestPhotoAnalysis}
              />
            )}
            {isAnalysisLoading && <LoadingSpinner />}
            {isError && (
              <Text style={styles.text}>
                Error Analyzing Photo :( Please try again
              </Text>
            )}
            {photoAnalysisData && <FitnessPlan data={photoAnalysisData} />}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
