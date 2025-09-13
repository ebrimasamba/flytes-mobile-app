import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

import { KEYBOARD_BEHAVIOR } from "@/constants";

type ScreenWrapperProps = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return (
    <KeyboardAvoidingView style={styles.safeArea} behavior={KEYBOARD_BEHAVIOR}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default ScreenWrapper;
