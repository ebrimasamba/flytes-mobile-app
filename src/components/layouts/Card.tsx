import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { colors } from "@/styles";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
  shadow?: boolean;
  rounded?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 16,
  margin = 0,
  shadow = true,
  rounded = true,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
          margin,
          borderRadius: rounded ? 16 : 0,
          shadowOpacity: shadow ? 0.1 : 0,
          elevation: shadow ? 4 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray + "20",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
  },
});

export default Card;
