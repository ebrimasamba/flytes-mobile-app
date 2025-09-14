import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "./Profile/ProfileScreen";
import HomeScreen from "@/screens/Protected/HomeScreen";
import SearchModalScreen from "@/screens/Protected/Modals/SearchModalScreen";

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="SearchModal"
        component={SearchModalScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default TabNavigator;
