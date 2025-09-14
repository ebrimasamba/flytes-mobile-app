import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React from "react";

import { Image } from "expo-image";

import { colors } from "@/styles";
import { H3 } from "../typography";

type ServiceItemProps = {
  title: string;
  image?: ImageSourcePropType;
  icon?: React.ReactNode;
  onPress?: () => void;
};

const ServiceItem = (props: ServiceItemProps) => {
  return (
    <TouchableOpacity style={styles.serviceItem} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        {props.icon && props.icon}
        {props.image && <Image source={props.image} style={styles.iconImage} />}
      </View>
      <H3 style={styles.serviceItemTitle}>{props.title}</H3>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 90,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceItemTitle: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  iconImage: {
    height: 34,
    resizeMode: "contain",
    width: 34,
  },
});

export default ServiceItem;
