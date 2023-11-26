import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import { LoadingSpinner } from "../components";
import { backgroundImage } from "../assets";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectAuthState, loginUser } from "../features/auth";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, token, loginTime } = useAppSelector(selectAuthState);
  const theme = useTheme();

  const sendLoginRequest = () => {
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    if (!token && !loginTime) return;

    const didOneHourPass = Date.now() - loginTime > 3600000;

    if (token && !didOneHourPass) {
      navigation.navigate("PhotoAnalysis");
    }
  }, [token, loginTime]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <View style={styles.textBackground}>
              <Text style={styles.title}>QuantumGains</Text>
            </View>
            {!loading ? (
              <View>
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
                <Button
                  icon="account-key"
                  mode="contained"
                  onPress={sendLoginRequest}
                  style={{ marginTop: 10 }}
                  buttonColor={theme.colors.primary}
                  textColor={theme.colors.onPrimary}
                >
                  Login
                </Button>
              </View>
            ) : (
              <LoadingSpinner />
            )}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
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
});
