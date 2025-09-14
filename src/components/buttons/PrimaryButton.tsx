// React and React Native core imports
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import React, { PropsWithChildren } from "react";

// Design system imports
import { colors, mixins } from "@/styles";
import { H2 } from "@/components/typography";
import { LinearGradient } from "expo-linear-gradient";

interface PrimaryButtonProps extends TouchableOpacityProps {
  icon?: any;
  style?: TouchableOpacityProps["style"];
  variant?: "secondary";
}
const PrimaryButton = (props: PropsWithChildren<PrimaryButtonProps>) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        mixins.button,
        props.variant === "secondary" && {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        },
        props.style,
      ]}
    >
      <LinearGradient
        colors={
          props.variant === "secondary"
            ? ["transparent", "transparent"]
            : [colors.primary, colors.primaryDark]
        }
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.buttonContent}>
        <H2
          style={[
            mixins.buttonText,
            props.variant === "secondary" && {
              color: colors.primary,
            },
          ]}
        >
          {props.children}
        </H2>
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
