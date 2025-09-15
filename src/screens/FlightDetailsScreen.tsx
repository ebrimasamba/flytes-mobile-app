import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/styles";
import { useFlightStore } from "@/store/flightStore";
import {
  formatCurrency,
  formatDuration,
  formatDate,
  formatTime,
  formatFlightNumber,
} from "@/utils";

import { H1, H2, H3, P } from "@/components/typography";
import Container from "@/components/misc/Container";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";
import Card from "@/components/layouts/Card";
import ScreenHeader from "@/components/layouts/ScreenHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const FlightDetailsScreen = () => {
  const navigation = useNavigation();
  const { selectedFlight } = useFlightStore();

  if (!selectedFlight) {
    return (
      <ScreenWrapper>
        <Container style={styles.container}>
          <H1>No flight selected</H1>
        </Container>
      </ScreenWrapper>
    );
  }

  const handleBookFlight = () => {
    navigation.navigate("FlightBooking" as never);
  };

  const handleShareFlight = () => {
    Alert.alert("Share", "Flight sharing feature coming soon!");
  };

  const renderFlightSegment = (segment: any, index: number) => (
    <Card key={index} style={styles.segmentCard}>
      <View style={styles.segmentHeader}>
        <View style={styles.airlineInfo}>
          <View style={styles.airlineLogo}>
            <P style={styles.airlineInitial}>
              {segment.marketingCarrier?.name?.substring(0, 2) || "FL"}
            </P>
          </View>
          <View style={styles.airlineDetails}>
            <P style={styles.airlineName}>
              {segment.marketingCarrier?.name || "Flight"}
            </P>
            <P style={styles.flightNumber}>{segment.flightNumber || "N/A"}</P>
          </View>
        </View>
        <View style={styles.aircraftInfo}>
          <P style={styles.aircraft}>
            {segment.operatingCarrier?.name || "Flight"}
          </P>
        </View>
      </View>

      <View style={styles.routeContainer}>
        {/* Departure */}
        <View style={styles.airportInfo}>
          <P style={styles.airportCode}>{segment.origin.displayCode}</P>
          <P style={styles.airportName}>{segment.origin.name}</P>
          <P style={styles.airportCity}>
            {segment.origin.city || segment.origin.name}
          </P>
          <P style={styles.time}>{formatTime(segment.departure)}</P>
          <P style={styles.date}>{formatDate(segment.departure)}</P>
        </View>

        {/* Flight Path */}
        <View style={styles.flightPath}>
          <View style={styles.flightLineContainer}>
            <View style={styles.flightLine} />
            <View style={styles.airplaneIconContainer}>
              <MaterialIcons name="flight" size={20} color={colors.white} />
            </View>
          </View>
          <P style={styles.duration}>
            {formatDuration(segment.durationInMinutes)}
          </P>
          <View style={styles.stopsContainer}>
            <MaterialIcons name="flight" size={14} color={colors.success} />
            <P style={styles.stops}>Direct</P>
          </View>
        </View>

        {/* Arrival */}
        <View style={styles.airportInfo}>
          <P style={styles.airportCode}>{segment.destination.displayCode}</P>
          <P style={styles.airportName}>{segment.destination.name}</P>
          <P style={styles.airportCity}>
            {segment.destination.city || segment.destination.name}
          </P>
          <P style={styles.time}>{formatTime(segment.arrival)}</P>
          <P style={styles.date}>{formatDate(segment.arrival)}</P>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Flight Details"
        subtitle="Review your selected flight"
      />
      <Container style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.priceSection}>
              <H1 style={styles.price}>{selectedFlight.price.formatted}</H1>
              <P style={styles.pricePerPerson}>per person</P>
            </View>
            <View style={styles.flightSummary}>
              <P style={styles.summaryText}>
                {selectedFlight.legs[0].origin.displayCode} →{" "}
                {
                  selectedFlight.legs[selectedFlight.legs.length - 1]
                    .destination.displayCode
                }
              </P>
              <P style={styles.summaryDetails}>
                {formatDuration(selectedFlight.legs[0].durationInMinutes)} •{" "}
                {selectedFlight.legs[0].stopCount === 0
                  ? "Non-stop"
                  : `${selectedFlight.legs[0].stopCount} stop${
                      selectedFlight.legs[0].stopCount > 1 ? "s" : ""
                    }`}
              </P>
            </View>
          </View>

          {/* Price Breakdown */}
          <Card style={styles.section}>
            <H2 style={styles.sectionTitle}>Price Breakdown</H2>
            <View style={styles.priceBreakdown}>
              <View style={[styles.priceRow, styles.totalRow]}>
                <P style={styles.totalLabel}>Total Price</P>
                <P style={styles.totalValue}>
                  {selectedFlight.price.formatted}
                </P>
              </View>
            </View>
          </Card>

          {/* Flight Segments */}
          <Card style={styles.section}>
            <H2 style={styles.sectionTitle}>
              Flight Details ({selectedFlight.legs.length} leg
              {selectedFlight.legs.length > 1 ? "s" : ""})
            </H2>
            {selectedFlight.legs.map((leg, index) =>
              leg.segments.map((segment, segmentIndex) =>
                renderFlightSegment(segment, index * 100 + segmentIndex)
              )
            )}
          </Card>

          {/* Flight Information */}
          <Card style={styles.section}>
            <H2 style={styles.sectionTitle}>Flight Information</H2>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <P style={styles.infoLabel}>Total Duration</P>
                <P style={styles.infoValue}>
                  {formatDuration(selectedFlight.legs[0].durationInMinutes)}
                </P>
              </View>
              <View style={styles.infoRow}>
                <P style={styles.infoLabel}>Stops</P>
                <P style={styles.infoValue}>
                  {selectedFlight.legs[0].stopCount === 0
                    ? "Non-stop"
                    : `${selectedFlight.legs[0].stopCount} stop${
                        selectedFlight.legs[0].stopCount > 1 ? "s" : ""
                      }`}
                </P>
              </View>
              <View style={styles.infoRow}>
                <P style={styles.infoLabel}>Fare Policy</P>
                <P style={styles.infoValue}>
                  {selectedFlight.farePolicy.isChangeAllowed
                    ? "Changeable"
                    : "Non-changeable"}
                </P>
              </View>
              <View style={styles.infoRow}>
                <P style={styles.infoLabel}>Cancellation</P>
                <P style={styles.infoValue}>
                  {selectedFlight.farePolicy.isCancellationAllowed
                    ? "Allowed"
                    : "Not allowed"}
                </P>
              </View>
            </View>
          </Card>

          {/* Baggage Information */}
          <Card style={styles.section}>
            <H2 style={styles.sectionTitle}>Baggage Information</H2>
            <View style={styles.baggageInfo}>
              <View style={styles.baggageItem}>
                <MaterialIcons
                  name="luggage"
                  size={20}
                  color={colors.primary}
                />
                <View style={styles.baggageDetails}>
                  <P style={styles.baggageTitle}>Carry-on Baggage</P>
                  <P style={styles.baggageDescription}>
                    Personal item included
                  </P>
                </View>
              </View>
              <View style={styles.baggageItem}>
                <MaterialIcons name="work" size={20} color={colors.primary} />
                <View style={styles.baggageDetails}>
                  <P style={styles.baggageTitle}>Checked Baggage</P>
                  <P style={styles.baggageDescription}>
                    Additional fees may apply
                  </P>
                </View>
              </View>
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShareFlight}
            >
              <MaterialIcons name="share" size={20} color={colors.primary} />
              <P style={styles.shareButtonText}>Share</P>
            </TouchableOpacity>
            <PrimaryButton style={styles.bookButton} onPress={handleBookFlight}>
              Book Flight
            </PrimaryButton>
          </View>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  priceSection: {
    alignItems: "flex-start",
  },
  price: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.primary,
  },
  pricePerPerson: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  flightSummary: {
    alignItems: "flex-end",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  summaryDetails: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  priceBreakdown: {
    gap: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
    paddingTop: 16,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  segmentCard: {
    marginBottom: 16,
  },
  segmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  airlineLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  airlineInitial: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  airlineDetails: {
    flex: 1,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  flightNumber: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  aircraftInfo: {
    alignItems: "flex-end",
  },
  aircraft: {
    fontSize: 12,
    color: colors.textLight,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  airportInfo: {
    flex: 1,
    alignItems: "center",
  },
  airportCode: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  airportName: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 2,
  },
  airportCity: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: colors.textLight,
    marginBottom: 4,
  },
  terminal: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: "600",
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
    marginBottom: 12,
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
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  duration: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  stopsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stops: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.success,
  },
  infoContainer: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  baggageInfo: {
    gap: 16,
  },
  baggageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  baggageDetails: {
    flex: 1,
  },
  baggageTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  baggageDescription: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  shareButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  bookButton: {
    flex: 2,
  },
});

export default FlightDetailsScreen;
