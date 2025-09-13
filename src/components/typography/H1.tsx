import React from "react";
import typography from "@/styles/typography";
import { Text, TextProps } from "react-native";

const H1 = (props: TextProps) => {
  return (
    <Text {...props} style={[typography.h1 as object, props.style]}>
      {props.children}
    </Text>
  );
};

export default H1;
