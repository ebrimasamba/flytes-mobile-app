import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { H1, H2, P } from "../typography";
import { colors } from "@/styles";
import DesignationItem from "./DesignationItem";
import { POPULAR_DESTINATIONS } from "@/constants";
import Card from "../layouts/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PopularDestinations = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <H1 style={styles.title}>Popular Flights</H1>
          <TouchableOpacity style={styles.seeAllButton}>
            <P style={styles.seeAllText}>See all</P>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <P style={styles.description}>
          Discover the most popular flights around the world
        </P>
      </View>

      <Card style={styles.destinationsCard} padding={0} margin={0}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinations}
        >
          {POPULAR_DESTINATIONS.map((destination) => (
            <DesignationItem key={destination.id} {...destination} />
          ))}
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  header: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 23,
    color: colors.text,
    fontWeight: "700",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  destinationsCard: {
    marginHorizontal: -16,
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
  },
  destinations: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
});

export default PopularDestinations;
