// React and React Native core imports
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { ActivityIndicator } from "react-native";

// Design system imports
import { colors, mixins } from "@/styles";
import { H2 } from "@/components/typography";
import { LinearGradient } from "expo-linear-gradient";

interface PrimaryButtonProps extends TouchableOpacityProps {
  icon?: any;
  style?: TouchableOpacityProps["style"];
  variant?: "secondary" | "text";
  loading?: boolean;
}
const PrimaryButton = (props: PropsWithChildren<PrimaryButtonProps>) => {
  const { loading, variant, ...touchableProps } = props;

  const getButtonStyle = () => {
    if (variant === "secondary") {
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary,
      };
    }
    if (variant === "text") {
      return {
        backgroundColor: "transparent",
        borderWidth: 0,
      };
    }
    return {};
  };

  const getTextStyle = () => {
    if (variant === "secondary") {
      return { color: colors.primary };
    }
    if (variant === "text") {
      return {
        color: colors.primary,
        textDecorationLine: "underline" as const,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      {...touchableProps}
      disabled={loading || props.disabled}
      style={[mixins.button, getButtonStyle(), props.style]}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator
            color={variant === "text" ? colors.primary : colors.white}
          />
        ) : (
          <H2 style={[mixins.buttonText, getTextStyle()]}>{props.children}</H2>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default PrimaryButton;
