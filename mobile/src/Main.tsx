import React, { useEffect } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CameraPermissionScreen,
  LoginScreen,
  PhotoAnalysisScreen,
} from "./screens";
import { useAppDispatch, useAppSelector } from "./app/store";
import { selectAuthState, logoutUser } from "./features/auth";

const Stack = createNativeStackNavigator();

export const Main = () => {
  const dispatch = useAppDispatch();
  const { token, loginTime } = useAppSelector(selectAuthState);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (!token && !loginTime) return;

    const didOneHourPass = Date.now() - loginTime > 3600000;
    if (didOneHourPass) {
      // logout user if one hour has passed since login
      // and navigate to login screen
      dispatch(logoutUser());
      navigationRef.navigate("Login" as never);
    }
  }, [token, loginTime]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PhotoAnalysis" component={PhotoAnalysisScreen} />
        <Stack.Screen
          name="CameraPermission"
          component={CameraPermissionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
