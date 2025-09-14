import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "@/styles";
import { HEADER_BACKGROUND, PROFILE } from "@/constants/images";

import { H1, H2, H3, P } from "@/components/typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ImageBackground } from "expo-image";
import Container from "../misc/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonInput from "../inputs/ButtonInput";

const HomeHeader = () => {
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">(
    "round-trip"
  );

  const handleInputPress = (inputType: string) => {
    setActiveInput(inputType);
  };

  const handleTripTypeChange = (type: "one-way" | "round-trip") => {
    setTripType(type);
  };

  return (
    <ImageBackground source={HEADER_BACKGROUND} contentFit="cover">
      <SafeAreaView edges={["top"]}>
        <Container style={styles.headerContainer}>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <View style={styles.greetingContainer}>
              <View style={styles.greetingRow}>
                <H3 style={styles.greeting}>Hello Ebrima,</H3>
              </View>
              <H1 style={styles.title}>Traveling today?</H1>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Image source={PROFILE} style={styles.profileImage} />
              {/* <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>3</Text>
                </View> */}
            </TouchableOpacity>
          </View>

          {/* Search Container */}
          <View style={styles.searchContainer}>
            {/* Trip Type Selector */}
            <View style={styles.tripTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.tripTypeButton,
                  tripType === "round-trip" && styles.tripTypeButtonActive,
                ]}
                onPress={() => handleTripTypeChange("round-trip")}
              >
                <MaterialIcons
                  name="sync-alt"
                  size={16}
                  color={
                    tripType === "round-trip" ? colors.white : colors.primary
                  }
                />
                <P
                  style={[
                    styles.tripTypeText,
                    tripType === "round-trip" && styles.tripTypeTextActive,
                  ]}
                >
                  Round-trip
                </P>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tripTypeButton,
                  tripType === "one-way" && styles.tripTypeButtonActive,
                ]}
                onPress={() => handleTripTypeChange("one-way")}
              >
                <MaterialIcons
                  name="trending-flat"
                  size={16}
                  color={tripType === "one-way" ? colors.white : colors.primary}
                />
                <P
                  style={[
                    styles.tripTypeText,
                    tripType === "one-way" && styles.tripTypeTextActive,
                  ]}
                >
                  One-way
                </P>
              </TouchableOpacity>
            </View>

            {/* Location Inputs */}
            <View style={styles.locationContainer}>
              <ButtonInput
                active={activeInput === "from"}
                icon="location-pin"
                placeholder="From"
                value="London (LHR)"
                onPress={() => handleInputPress("from")}
              />

              <TouchableOpacity style={styles.swapButton}>
                <MaterialIcons
                  name="swap-vert"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <ButtonInput
                active={activeInput === "destination"}
                icon="plane"
                placeholder="To"
                value="New York (JFK)"
                onPress={() => handleInputPress("destination")}
              />
            </View>

            {/* Date and Passenger Inputs */}
            <View style={styles.detailsContainer}>
              <View style={styles.dateContainer}>
                <ButtonInput
                  style={styles.dateInput}
                  active={activeInput === "departure"}
                  icon="calendar"
                  placeholder="Departure"
                  value="Dec 25"
                  onPress={() => handleInputPress("departure")}
                />

                {tripType === "round-trip" && (
                  <ButtonInput
                    style={styles.dateInput}
                    active={activeInput === "return"}
                    icon="calendar"
                    placeholder="Return"
                    value="Jan 2"
                    onPress={() => handleInputPress("return")}
                  />
                )}
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton}>
              <P style={styles.searchButtonText}>Search Flights</P>
              <View style={styles.searchButtonIcon}>
                <MaterialIcons name="search" size={20} color={colors.white} />
              </View>
            </TouchableOpacity>
          </View>
        </Container>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 24,
    // paddingBottom: 32,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  greeting: {
    fontSize: 17,
    color: colors.text,
    letterSpacing: -0.2,
    opacity: 0.85,
    fontWeight: "600",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  temperature: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  title: {
    fontSize: 28,
    letterSpacing: -0.8,
    color: colors.text,
    lineHeight: 34,
  },
  profileButton: {
    position: "relative",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  notificationText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },
  searchContainer: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 24,
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 20,
    // elevation: 8,
  },
  tripTypeContainer: {
    flexDirection: "row",
    backgroundColor: colors.gray + "15",
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  tripTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  tripTypeButtonActive: {
    backgroundColor: colors.primary,
    // shadowColor: colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 2,
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  tripTypeTextActive: {
    color: colors.white,
  },
  multiCityButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 4,
  },
  multiCityText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textLight,
  },
  locationContainer: {
    position: "relative",
    marginBottom: 20,
    gap: 16,
  },
  swapButton: {
    position: "absolute",
    right: 16,
    top: 50,
    zIndex: 10,
    backgroundColor: colors.white,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.gray + "20",
  },
  detailsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  dateContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  passengerInput: {
    flex: 1,
  },

  searchButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    // shadowColor: colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 4,
    // marginBottom: 20,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.2,
  },
  searchButtonIcon: {
    backgroundColor: colors.white + "20",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
  },
  quickAction: {
    alignItems: "center",
    gap: 6,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
});

export default HomeHeader;
