import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "@/styles/colors";

import LoginScreen from "@/screens/LoginScreen";
import LoadingScreen from "@/screens/LoadingScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
