import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import dayjs from "dayjs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useFlightStore } from "@/store/flightStore";
import { useAuthStore } from "@/store/authStore";
import { Place } from "@/services/placesService";

import ScreenWrapper from "@/components/wrappers/ScreenWrapper";
import ScreenHeader from "@/components/layouts/ScreenHeader";
import Card from "@/components/layouts/Card";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import LoadingSpinner from "@/components/misc/LoadingSpinner";

import FormikPlaceInput from "@/components/forms/FormikPlaceInput";
import FormikDatePicker from "@/components/forms/FormikDatePicker";
import FormikInput from "@/components/forms/FormikInput";

import { colors } from "@/styles";
import { H2, H3, P } from "@/components/typography";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { enhancedFlightSearchSchema } from "@/schemas/validation";

type FlightSearchFormData = {
  from: Place | null;
  to: Place | null;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: "economy" | "premium_economy" | "business" | "first";
  currency: string;
};

const SkyscannerFlightSearchScreen = () => {
  const navigation = useNavigation();
  const { searchFlights, isLoading, recentSearches, addRecentSearch } =
    useFlightStore();
  const { user } = useAuthStore();
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const initialValues: FlightSearchFormData = {
    from: null,
    to: null,
    departDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
    returnDate: dayjs().add(8, "day").format("YYYY-MM-DD"),
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: "economy",
    currency: "USD",
  };

  const handleSearch = async (values: FlightSearchFormData) => {
    try {
      // Convert places to API format - extract both skyId and entityId for API calls
      const searchParams = {
        from:
          values.from?.skyId ||
          values.from?.entityId ||
          values.from?.code ||
          values.from?.id ||
          "",
        to:
          values.to?.skyId ||
          values.to?.entityId ||
          values.to?.code ||
          values.to?.id ||
          "",
        originEntityId: values.from?.entityId || "",
        destinationEntityId: values.to?.entityId || "",
        departDate: values.departDate,
        returnDate: isRoundTrip ? values.returnDate : undefined,
        adults: values.adults,
        children: values.children || 0,
        infants: values.infants || 0,
        cabinClass: values.cabinClass,
        currency: values.currency,
        sortBy: "best",
        market: "en-US",
        countryCode: "US",
      };

      await searchFlights(searchParams);

      // Add to recent searches
      addRecentSearch(searchParams);

      // Navigate to results
      navigation.navigate("FlightResults" as never);
    } catch (error) {
      Alert.alert(
        "Search Error",
        "Failed to search for flights. Please try again."
      );
    }
  };

  const handleSwapLocations = (
    setFieldValue: any,
    values: FlightSearchFormData
  ) => {
    setFieldValue("from", values.to);
    setFieldValue("to", values.from);
  };

  const cabinClassOptions = [
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Find Your Flight"
        subtitle="Search for the best flight deals with Skyscanner"
      />

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={toFormikValidationSchema(
            enhancedFlightSearchSchema
          )}
          onSubmit={handleSearch}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Trip Type Selection */}
              <Card style={styles.section}>
                <View style={styles.tripTypeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tripTypeButton,
                      isRoundTrip && styles.tripTypeButtonActive,
                    ]}
                    onPress={() => setIsRoundTrip(true)}
                  >
                    <MaterialIcons
                      name="sync"
                      size={20}
                      color={isRoundTrip ? colors.white : colors.primary}
                    />
                    <P
                      style={[
                        styles.tripTypeText,
                        isRoundTrip && styles.tripTypeTextActive,
                      ]}
                    >
                      Round Trip
                    </P>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tripTypeButton,
                      !isRoundTrip && styles.tripTypeButtonActive,
                    ]}
                    onPress={() => setIsRoundTrip(false)}
                  >
                    <MaterialIcons
                      name="trending-flat"
                      size={20}
                      color={!isRoundTrip ? colors.white : colors.primary}
                    />
                    <P
                      style={[
                        styles.tripTypeText,
                        !isRoundTrip && styles.tripTypeTextActive,
                      ]}
                    >
                      One Way
                    </P>
                  </TouchableOpacity>
                </View>
              </Card>

              {/* Locations */}
              <Card style={styles.section}>
                <H3 style={styles.sectionTitle}>Where to?</H3>

                <View style={styles.locationsContainer}>
                  <View style={styles.locationInput}>
                    <FormikPlaceInput
                      name="from"
                      label="From"
                      placeholder="Departure city or airport"
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.swapButton}
                    onPress={() => handleSwapLocations(setFieldValue, values)}
                  >
                    <MaterialIcons
                      name="swap-vert"
                      size={24}
                      color={colors.primary}
                    />
                  </TouchableOpacity>

                  <View style={styles.locationInput}>
                    <FormikPlaceInput
                      name="to"
                      label="To"
                      placeholder="Destination city or airport"
                    />
                  </View>
                </View>
              </Card>

              {/* Dates */}
              <Card style={styles.section}>
                <H3 style={styles.sectionTitle}>When?</H3>

                <View style={styles.datesContainer}>
                  <View style={styles.dateInput}>
                    <FormikDatePicker
                      name="departDate"
                      label="Departure"
                      placeholder="Select departure date"
                      minimumDate={new Date()}
                    />
                  </View>

                  {isRoundTrip && (
                    <View style={styles.dateInput}>
                      <FormikDatePicker
                        name="returnDate"
                        label="Return"
                        placeholder="Select return date"
                        minimumDate={new Date(values.departDate)}
                      />
                    </View>
                  )}
                </View>
              </Card>

              {/* Passengers */}
              <Card style={styles.section}>
                <H3 style={styles.sectionTitle}>Passengers</H3>

                <View style={styles.passengersContainer}>
                  <View style={styles.passengerRow}>
                    <View style={styles.passengerInfo}>
                      <MaterialIcons
                        name="person"
                        size={20}
                        color={colors.primary}
                      />
                      <P style={styles.passengerLabel}>Adults (12+)</P>
                    </View>
                    <View style={styles.counterContainer}>
                      <TouchableOpacity
                        style={[
                          styles.counterButton,
                          values.adults <= 1 && styles.counterButtonDisabled,
                        ]}
                        onPress={() =>
                          setFieldValue(
                            "adults",
                            Math.max(1, values.adults - 1)
                          )
                        }
                        disabled={values.adults <= 1}
                      >
                        <MaterialIcons
                          name="remove"
                          size={20}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                      <P style={styles.counterValue}>{values.adults}</P>
                      <TouchableOpacity
                        style={[
                          styles.counterButton,
                          values.adults >= 9 && styles.counterButtonDisabled,
                        ]}
                        onPress={() =>
                          setFieldValue(
                            "adults",
                            Math.min(9, values.adults + 1)
                          )
                        }
                        disabled={values.adults >= 9}
                      >
                        <MaterialIcons
                          name="add"
                          size={20}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.passengerRow}>
                    <View style={styles.passengerInfo}>
                      <MaterialIcons
                        name="child-care"
                        size={20}
                        color={colors.primary}
                      />
                      <P style={styles.passengerLabel}>Children (2-11)</P>
                    </View>
                    <View style={styles.counterContainer}>
                      <TouchableOpacity
                        style={[
                          styles.counterButton,
                          values.children <= 0 && styles.counterButtonDisabled,
                        ]}
                        onPress={() =>
                          setFieldValue(
                            "children",
                            Math.max(0, values.children - 1)
                          )
                        }
                        disabled={values.children <= 0}
                      >
                        <MaterialIcons
                          name="remove"
                          size={20}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                      <P style={styles.counterValue}>{values.children}</P>
                      <TouchableOpacity
                        style={[
                          styles.counterButton,
                          values.children >= 9 && styles.counterButtonDisabled,
                        ]}
                        onPress={() =>
                          setFieldValue(
                            "children",
                            Math.min(9, values.children + 1)
                          )
                        }
                        disabled={values.children >= 9}
                      >
                        <MaterialIcons
                          name="add"
                          size={20}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.passengerRow}>
                    <View style={styles.passengerInfo}>
                      <MaterialIcons
                        name="baby-changing-station"
                        size={20}
                        color={colors.primary}
                      />
                      <P style={styles.passengerLabel}>Infants (0-1)</P>
                    </View>
                    <View style={styles.counterContainer}>
                      <TouchableOpacity
                        style={[
                          styles.counterButton,
                          values.infants <= 0 && styles.counterButtonDisabled,
                        ]}
                        onPress={() =>
                          setFieldValue(
                            "infants",
                            Math.max(0, values.infants - 1)
                          )
                        }
                        disabled={values.infants <= 0}
                      >
                        <MaterialIcons
                          name="remove"
                          size={20}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                      <P style={styles.counterValue}>{values.infants}</P>
                      <TouchableOpacity
                        style={[
                          styles.counterButton,
                          values.infants >= 9 && styles.counterButtonDisabled,
                        ]}
                        onPress={() =>
                          setFieldValue(
                            "infants",
                            Math.min(9, values.infants + 1)
                          )
                        }
                        disabled={values.infants >= 9}
                      >
                        <MaterialIcons
                          name="add"
                          size={20}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>

              {/* Cabin Class */}
              <Card style={styles.section}>
                <H3 style={styles.sectionTitle}>Cabin Class</H3>

                <View style={styles.cabinClassContainer}>
                  {cabinClassOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.cabinClassButton,
                        values.cabinClass === option.value &&
                          styles.cabinClassButtonActive,
                      ]}
                      onPress={() => setFieldValue("cabinClass", option.value)}
                    >
                      <P
                        style={[
                          styles.cabinClassText,
                          values.cabinClass === option.value &&
                            styles.cabinClassTextActive,
                        ]}
                      >
                        {option.label}
                      </P>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <Card style={styles.section}>
                  <H2 style={styles.recentTitle}>Recent Searches</H2>
                  {recentSearches.slice(0, 3).map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.recentSearchItem}
                      onPress={() => {
                        setFieldValue("from", search.from);
                        setFieldValue("to", search.to);
                        setFieldValue("departDate", search.departDate);
                        if (search.returnDate) {
                          setFieldValue("returnDate", search.returnDate);
                        }
                      }}
                    >
                      <View style={styles.recentSearchInfo}>
                        <P style={styles.recentSearchRoute}>
                          {search.from} → {search.to}
                        </P>
                        <P style={styles.recentSearchDate}>
                          {dayjs(search.departDate).format("MMM DD")}
                          {search.returnDate &&
                            ` - ${dayjs(search.returnDate).format("MMM DD")}`}
                        </P>
                      </View>
                      <MaterialIcons
                        name="history"
                        size={20}
                        color={colors.textLight}
                      />
                    </TouchableOpacity>
                  ))}
                </Card>
              )}

              {/* Search Button */}
              <View style={styles.searchButtonContainer}>
                <PrimaryButton
                  onPress={() => handleSubmit()}
                  loading={isLoading}
                  disabled={isLoading || !isValid || !dirty}
                >
                  {isLoading ? "Searching..." : "Search Flights"}
                </PrimaryButton>
              </View>
            </ScrollView>
          )}
        </Formik>
      </Animated.View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  tripTypeContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  tripTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  tripTypeButtonActive: {
    backgroundColor: colors.primary,
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  tripTypeTextActive: {
    color: colors.white,
  },
  locationsContainer: {
    gap: 12,
  },
  locationInput: {
    flex: 1,
  },
  swapButton: {
    alignSelf: "center",
    padding: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
  },
  datesContainer: {
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  passengersContainer: {
    gap: 16,
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  passengerLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  counterButtonDisabled: {
    borderColor: colors.border,
    opacity: 0.5,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    minWidth: 20,
    textAlign: "center",
  },
  cabinClassContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  cabinClassButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cabinClassButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cabinClassText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
  },
  cabinClassTextActive: {
    color: colors.white,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentSearchInfo: {
    flex: 1,
  },
  recentSearchRoute: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 2,
  },
  recentSearchDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  searchButtonContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default SkyscannerFlightSearchScreen;
