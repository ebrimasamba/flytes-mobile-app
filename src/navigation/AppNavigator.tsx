import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "@/store/authStore";

import colors from "@/styles/colors";

import TabNavigator from "./TabNavigator";
import LoginScreen from "@/screens/LoginScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import CreateAccountScreen from "@/screens/CreateAccountScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Tab" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
