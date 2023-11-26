import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient";
import { setSessionState } from "./slice";

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(setSessionState({ loading: true }));
  try {
    const response = await apiClient.post("/users/login", {
      username,
      password,
    });

    const { token } = response;

    await AsyncStorage.setItem("userToken", token);
    dispatch(
      setSessionState({
        token,
        username,
        loginTime: Date.now(),
        loading: false,
        error: null,
      })
    );
  } catch (error) {
    dispatch(setSessionState({ loading: false, error: error.message }));
  }
};

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem("userToken");
  dispatch(setSessionState({ token: null, username: null, loginTime: null, loading: false, error: null }));
};
