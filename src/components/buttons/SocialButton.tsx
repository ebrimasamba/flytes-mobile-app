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
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface SocialButtonProps extends TouchableOpacityProps {
  name?: "facebook" | "google" | "apple";
  style?: TouchableOpacityProps["style"];
  variant?: "secondary";
}

const SocialButton = (props: PropsWithChildren<SocialButtonProps>) => {
  const getSocialIcon = (name?: string) => {
    switch (name) {
      case "facebook":
        return <AntDesign name="facebook-square" size={24} color={"#3b5998"} />;
      case "google":
        return <AntDesign name="google" size={24} color={"#4285F4"} />;
      case "apple":
        return <FontAwesome name="apple" size={24} color={"#000000"} />;
      default:
        return <AntDesign name="apple1" size={24} color={"#000000"} />;
    }
  };

  return (
    <TouchableOpacity
      {...props}
      style={[
        mixins.button,
        styles.socialButton,
        props?.variant === "secondary" && {
          backgroundColor: colors.gray,
        },
        props?.style,
      ]}
    >
      <View style={styles.buttonContent}>
        {<View style={styles.iconContainer}>{getSocialIcon(props.name)}</View>}

        <H2
          style={[
            mixins.buttonText,
            styles.socialButtonText,
            props?.variant === "secondary" && {
              color: colors.primary,
            },
          ]}
        >
          {props.name}
        </H2>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  socialButtonText: {
    color: colors.text,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default SocialButton;
