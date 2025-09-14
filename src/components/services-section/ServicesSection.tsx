import { View, StyleSheet } from "react-native";

import { colors } from "@/styles";
import { SERVICES } from "@/constants";
import ServiceItem from "./ServiceItem";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ICONS = [
  <FontAwesome name="plane" size={24} color="black" />,
  <FontAwesome name="hotel" size={24} color="black" />,
  <FontAwesome name="car" size={24} color="black" />,
];

const ServicesSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {SERVICES.map((service) => (
          <ServiceItem
            key={service.id}
            icon={ICONS[service.id - 1]}
            title={service.name}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 7,
    borderRadius: 16,
    marginVertical: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ServicesSection;
