import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "./Profile/ProfileScreen";
import HomeScreen from "@/screens/Protected/HomeScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home"
              color={focused ? colors.primary : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="person"
              color={focused ? colors.primary : color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
