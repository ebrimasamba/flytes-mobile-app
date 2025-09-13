import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type ContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const Container = ({ children, style }: ContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
  },
});

export default Container;
