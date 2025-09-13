import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

// Local imports
import { colors, mixins } from "@/styles";

// Component imports
import { H3 } from "../typography";

interface InputProps extends TextInputProps {
  label?: string;
  error?: boolean;
  onFocused?: () => void;
  onBlurred?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  containerStyle?: object;
  search?: boolean;
  onClear?: () => void;
}

const Input = (props: InputProps) => {
  // State
  const [focused, setFocused] = useState(false);

  // Refs
  const inputRef = useRef<TextInput>(null);

  // Event handlers
  const onFocus = () => {
    setFocused(true);
    props.onFocused?.();
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    props?.onBlurred?.(e);
  };

  // Computed values
  const hasValue = props.value && props.value.length > 0;

  const inputStyles = [
    styles.input,
    focused && styles.inputFocused,
    props.error && styles.inputError,
    props.search && styles.inputSearch,
    props.style,
  ];

  const labelStyles = [
    styles.label,
    focused && styles.labelFocused,
    hasValue && styles.labelWithValue,
  ];

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.inputWrapper}>
        {props.label && <H3 style={labelStyles}>{props.label}</H3>}

        <TextInput
          {...props}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          style={inputStyles}
          placeholder={focused ? props.placeholder : undefined}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputWrapper: {
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 12,
    top: 8,
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
    zIndex: 1,
    // backgroundColor: colors.white,
    paddingHorizontal: 4,
  },
  labelFocused: {
    color: colors.primary,
  },
  labelWithValue: {
    color: colors.textLight,
  },
  input: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    // borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 12,
    fontSize: 16,
    color: colors.text,
    fontFamily: "Figtree Regular",
    fontWeight: "400",
    letterSpacing: -0.05,
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 1,
  },
  inputFocused: {
    borderColor: colors.primary,
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
  inputError: {
    borderColor: colors.danger,
  },
  inputSearch: {
    paddingLeft: 40,
  },
  search: {
    position: "absolute",
    left: 10,
    top: 11,
    zIndex: 1,
  },
});

export default Input;
