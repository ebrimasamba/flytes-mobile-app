import React from 'react';
import { typography } from '../../styles';
import { Text, TextProps } from 'react-native';

const H3 = (props: TextProps) => {
    return (
        <Text {...props} style={[typography.h3 as object, props.style]}>
            {props.children}
        </Text>
    );
};

export default H3;
