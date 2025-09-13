import React from "react";
import typography from "@/styles/typography";
import { Text, TextProps } from "react-native";

const H2 = (props: TextProps) => {
  return (
    <Text {...props} style={[typography.h2 as object, props.style]}>
      {props.children}
    </Text>
  );
};

export default H2;
