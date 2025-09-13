import React from "react";
import { typography } from "../../styles";
import { Text, TextProps } from "react-native";

const P = (props: TextProps) => {
    return (
        <Text {...props} style={[typography.p, props.style]}>
            {props.children}
        </Text>
    );
};

export default P;
