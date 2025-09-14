import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/styles";
import { Image } from "expo-image";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { DestinationType } from "@/types/destinations";

const flightData = {
  price: "$420",
  originalPrice: "$520",
  duration: "8h 15m",
  stops: "Non-stop",
  departure: "12:35",
  arrival: "15:50",
  airline: "Norse Atlantic",
  flightNumber: "N0 701",
  savings: "19%",
};

const DesignationItem = (props: DestinationType) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.97}>
      {/* Header with destination image and pricing */}
      <View style={styles.header}>
        <Image
          source={{ uri: props.image }}
          style={styles.destinationImage}
          contentFit="cover"
        />
        <View style={styles.imageOverlay} />
        <View style={styles.priceContainer}>
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>Save {flightData.savings}</Text>
          </View>
          <Text style={styles.originalPrice}>${flightData.originalPrice}</Text>
          <Text style={styles.price}>{flightData.price}</Text>
          <Text style={styles.priceLabel}>per person</Text>
        </View>
      </View>

      <View style={styles.flightDetails}>
        {/* Route Section */}
        <View style={styles.routeSection}>
          <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>LGW</Text>
            <Text style={styles.airportName}>London Gatwick</Text>
            <Text style={styles.time}>{flightData.departure}</Text>
          </View>

          <View style={styles.flightPath}>
            <View style={styles.flightLineContainer}>
              <View style={styles.flightLine} />
              <View style={styles.airplaneIconContainer}>
                <SimpleLineIcons name="plane" size={14} color={colors.white} />
              </View>
            </View>
            <Text style={styles.duration}>{flightData.duration}</Text>
            <View style={styles.stopsContainer}>
              <MaterialIcons name="flight" size={12} color={colors.success} />
              <Text style={styles.stops}>{flightData.stops}</Text>
            </View>
          </View>

          <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>JFK</Text>
            <Text style={styles.airportName}>New York JFK</Text>
            <Text style={styles.time}>{flightData.arrival}</Text>
          </View>
        </View>

        {/* Airline Section */}
        <View style={styles.airlineSection}>
          <View style={styles.airlineInfo}>
            <View style={styles.airlineLogo}>
              <Text style={styles.airlineInitial}>N</Text>
            </View>
            <View style={styles.airlineDetails}>
              <Text style={styles.airlineName}>{flightData.airline}</Text>
              <View style={styles.flightMetaRow}>
                <Text style={styles.flightNumber}>
                  {flightData.flightNumber}
                </Text>
                <View style={styles.dot} />
                <Text style={styles.flightClass}>Economy</Text>
              </View>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            <View style={styles.bestPriceBadge}>
              <MaterialIcons name="star" size={12} color={colors.warning} />
              <Text style={styles.badgeText}>Best Price</Text>
            </View>
          </View>
        </View>

        {/* Additional Info Row */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <MaterialIcons name="luggage" size={14} color={colors.textLight} />
            <Text style={styles.infoText}>Baggage included</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="event-seat"
              size={14}
              color={colors.textLight}
            />
            <Text style={styles.infoText}>Seat selection</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray + "20",
    overflow: "hidden",
    marginBottom: 20,
    width: 320,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  header: {
    height: 140,
    position: "relative",
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.15,
  },
  priceContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 80,
  },
  savingsBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  savingsText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
    textDecorationLine: "line-through",
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -0.5,
  },
  priceLabel: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: "500",
    marginTop: 2,
  },
  flightDetails: {
    padding: 20,
  },
  routeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  airportInfo: {
    flex: 1,
    alignItems: "center",
  },
  airportCode: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  airportName: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 6,
    fontWeight: "500",
    lineHeight: 14,
  },
  time: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  flightPath: {
    flex: 1.2,
    alignItems: "center",
    marginHorizontal: 16,
  },
  flightLineContainer: {
    width: "100%",
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  flightLine: {
    height: 3,
    backgroundColor: colors.primary,
    width: "100%",
    borderRadius: 2,
  },
  airplaneIconContainer: {
    position: "absolute",
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  duration: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  stopsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stops: {
    fontSize: 10,
    color: colors.success,
    fontWeight: "600",
  },
  airlineSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "30",
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  airlineLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  airlineInitial: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white,
  },
  airlineDetails: {
    flex: 1,
  },
  airlineName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 3,
  },
  flightMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flightNumber: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textLight,
    marginHorizontal: 8,
  },
  flightClass: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
  },
  badgeContainer: {
    alignItems: "flex-end",
  },
  bestPriceBadge: {
    backgroundColor: colors.warning + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.warning,
    letterSpacing: 0.3,
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: "500",
  },
});

export default DesignationItem;
