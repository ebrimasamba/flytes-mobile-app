import * as React from "react";

import { Assets as NavigationAssets } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";

import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "@/navigation/AppNavigator";

Asset.loadAsync([...NavigationAssets, require("@/assets/images/logo.png")]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
      <AppNavigator />
    </NavigationContainer>
  );
}
