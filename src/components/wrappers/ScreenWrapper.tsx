import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

import { KEYBOARD_BEHAVIOR } from "@/constants";
import colors from "@/styles/colors";

type ScreenWrapperProps = {
  children: React.ReactNode;
  noPadding?: boolean;
  noBackground?: boolean;
};

const ScreenWrapper = ({
  children,
  noPadding,
  noBackground,
}: ScreenWrapperProps) => {
  return (
    <KeyboardAvoidingView style={styles.safeArea} behavior={KEYBOARD_BEHAVIOR}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollView,
          !noBackground && { backgroundColor: colors.white },
          noPadding
            ? { paddingVertical: 0 }
            : {
                paddingVertical: 20,
              },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default ScreenWrapper;
