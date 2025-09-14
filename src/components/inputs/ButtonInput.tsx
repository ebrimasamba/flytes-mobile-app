import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { P } from "@/components/typography";
import { colors, mixins } from "@/styles";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

interface ButtonInputProps extends TouchableOpacityProps {
  active: boolean;
  icon: IconProps<any>["name"];
  placeholder?: string;
  value?: string;
}
const ButtonInput = (props: ButtonInputProps) => {
  return (
    <TouchableOpacity
      style={[props.style, styles.input, props.active && styles.inputActive]}
      onPress={props.onPress}
    >
      <SimpleLineIcons
        name={props.icon}
        size={22}
        color={props.active ? colors.primary : colors.textLight}
      />
      <P style={[styles.inputText, props.active && styles.inputTextActive]}>
        {props?.value || props?.placeholder}
      </P>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    ...mixins.input,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 0,
    backgroundColor: colors.backgroundInput,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  dateInput: {
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    color: colors.textLight,
    marginLeft: 14,
    fontWeight: "500",
  },
  inputActive: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
});

export default ButtonInput;
