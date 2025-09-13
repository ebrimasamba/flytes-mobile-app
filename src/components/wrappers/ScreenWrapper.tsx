import { mixins } from "@/styles";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenWrapperProps = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return <SafeAreaView style={mixins.expand}>{children}</SafeAreaView>;
};

export default ScreenWrapper;
