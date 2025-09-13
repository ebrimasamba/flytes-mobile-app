import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "@/styles/colors";

import TabNavigator from "./TabNavigator";
import LoginScreen from "@/screens/LoginScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import CreateAccountScreen from "@/screens/CreateAccountScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />

      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
