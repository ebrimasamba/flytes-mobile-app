import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { H2, P } from "../typography";
import { colors } from "@/styles";
import DesignationItem from "./DesignationItem";
import { POPULAR_DESTINATIONS } from "@/constants";

const PopularDestinations = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H2 style={styles.title}>Popular Flights</H2>
        <P style={styles.description}>
          Discover the most popular flights around the world
        </P>
      </View>
      <View style={styles.destinations}>
        {POPULAR_DESTINATIONS.map((destination) => (
          <DesignationItem key={destination.id} {...destination} />
        ))}
      </View>
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
  title: {
    fontSize: 23,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
  },
  destinations: {
    flex: 1,
    rowGap: 10,
  },
});

export default PopularDestinations;
