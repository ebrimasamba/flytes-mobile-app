import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/styles";
import { useFlightStore } from "@/store/flightStore";
import { FlightItinerary, FlightSearchParams } from "@/types/flight";

import {
  formatCurrency,
  formatDuration,
  formatDate,
  formatTime,
} from "@/utils";

import { H1, H2, P } from "@/components/typography";
import Container from "@/components/misc/Container";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";
import Card from "@/components/layouts/Card";
import ScreenHeader from "@/components/layouts/ScreenHeader";
import LoadingSpinner from "@/components/misc/LoadingSpinner";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const EnhancedFlightResultsScreen = () => {
  const navigation = useNavigation();
  const {
    searchResults,
    searchParams,
    setSelectedFlight,
    searchFlights,
    isLoading,
  } = useFlightStore();
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">(
    "price"
  );
  const [refreshing, setRefreshing] = useState(false);
  const [filteredResults, setFilteredResults] = useState<FlightItinerary[]>([]);

  // Show up to 500 results with FlashList
  const MAX_RESULTS = 500;

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    // Animate screen entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Memoized sorting function
  const sortFlights = useCallback(
    (flights: FlightItinerary[], sortType: string) => {
      return [...flights].sort((a, b) => {
        switch (sortType) {
          case "price":
            return a.price.raw - b.price.raw;
          case "duration":
            return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;
          case "departure":
            return (
              new Date(a.legs[0].departure).getTime() -
              new Date(b.legs[0].departure).getTime()
            );
          default:
            return 0;
        }
      });
    },
    []
  );

  // Memoized filtered and sorted results (limited to 50)
  const sortedResults = useMemo(() => {
    if (searchResults?.data?.itineraries) {
      const sorted = sortFlights([...searchResults.data.itineraries], sortBy);
      return sorted.slice(0, MAX_RESULTS); // Limit to 50 results
    }
    return [];
  }, [searchResults, sortBy, sortFlights]);

  // Update filtered results when sorting changes
  useEffect(() => {
    setFilteredResults(sortedResults);
  }, [sortedResults]);

  const handleFlightSelect = (flight: FlightItinerary) => {
    setSelectedFlight(flight);
    navigation.navigate("FlightDetails" as never);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await searchFlights(searchParams as FlightSearchParams);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Memoized key extractor
  const keyExtractor = useCallback((item: FlightItinerary) => item.id, []);

  // FlashList estimated item size
  const getItemType = useCallback(() => "flight-card", []);

  // Memoized estimated item size for FlashList
  const estimatedItemSize = useMemo(() => 200, []);

  // Memoized flight card component
  const FlightCard = React.memo(
    ({
      flight,
      onSelect,
    }: {
      flight: FlightItinerary;
      onSelect: (flight: FlightItinerary) => void;
    }) => (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        }}
      >
        <TouchableOpacity
          style={styles.flightCard}
          onPress={() => onSelect(flight)}
          activeOpacity={0.7}
        >
          <Card style={styles.cardContent}>
            {/* Price Header */}
            <View style={styles.priceHeader}>
              <View style={styles.priceContainer}>
                <P style={styles.price}>{flight.price.formatted}</P>
                <P style={styles.priceLabel}>per person</P>
              </View>
              <View style={styles.airlineInfo}>
                <View style={styles.airlineLogo}>
                  <P style={styles.airlineInitial}>
                    {flight.legs[0].carriers.marketing[0]?.name?.substring(
                      0,
                      2
                    ) || "FL"}
                  </P>
                </View>
                <P style={styles.airlineName}>
                  {flight.legs[0].carriers.marketing[0]?.name || "Flight"}
                </P>
              </View>
            </View>

            {/* Route Information */}
            <View style={styles.routeContainer}>
              <View style={styles.airportInfo}>
                <P style={styles.airportCode}>
                  {flight.legs[0].origin.displayCode}
                </P>
                <P style={styles.airportName}>
                  {flight.legs[0].origin.city || flight.legs[0].origin.name}
                </P>
                <P style={styles.time}>
                  {formatTime(flight.legs[0].departure)}
                </P>
                <P style={styles.date}>
                  {formatDate(flight.legs[0].departure)}
                </P>
              </View>

              <View style={styles.flightPath}>
                <View style={styles.flightLineContainer}>
                  <View style={styles.flightLine} />
                  <View style={styles.airplaneIconContainer}>
                    <MaterialIcons
                      name="flight"
                      size={16}
                      color={colors.white}
                    />
                  </View>
                </View>
                <P style={styles.duration}>
                  {formatDuration(flight.legs[0].durationInMinutes)}
                </P>
                <View style={styles.stopsContainer}>
                  <MaterialIcons
                    name={
                      flight.legs[0].stopCount === 0
                        ? "flight"
                        : "transfer-within-a-station"
                    }
                    size={12}
                    color={
                      flight.legs[0].stopCount === 0
                        ? colors.success
                        : colors.warning
                    }
                  />
                  <P
                    style={[
                      styles.stops,
                      {
                        color:
                          flight.legs[0].stopCount === 0
                            ? colors.success
                            : colors.warning,
                      },
                    ]}
                  >
                    {flight.legs[0].stopCount === 0
                      ? "Non-stop"
                      : `${flight.legs[0].stopCount} stop${
                          flight.legs[0].stopCount > 1 ? "s" : ""
                        }`}
                  </P>
                </View>
              </View>

              <View style={styles.airportInfo}>
                <P style={styles.airportCode}>
                  {flight.legs[flight.legs.length - 1].destination.displayCode}
                </P>
                <P style={styles.airportName}>
                  {flight.legs[flight.legs.length - 1].destination.city ||
                    flight.legs[flight.legs.length - 1].destination.name}
                </P>
                <P style={styles.time}>
                  {formatTime(flight.legs[flight.legs.length - 1].arrival)}
                </P>
                <P style={styles.date}>
                  {formatDate(flight.legs[flight.legs.length - 1].arrival)}
                </P>
              </View>
            </View>

            {/* Flight Details */}
            <View style={styles.flightDetails}>
              <View style={styles.detailItem}>
                <MaterialIcons
                  name="flight"
                  size={14}
                  color={colors.textLight}
                />
                <P style={styles.detailText}>
                  {flight.legs[0].segments[0]?.flightNumber || "N/A"}
                </P>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons
                  name="airplanemode-active"
                  size={14}
                  color={colors.textLight}
                />
                <P style={styles.detailText}>
                  {flight.legs[0].carriers.marketing[0]?.name || "Flight"}
                </P>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons
                  name="class"
                  size={14}
                  color={colors.textLight}
                />
                <P style={styles.detailText}>Economy</P>
              </View>
            </View>

            {/* Select Button */}
            <View style={styles.selectButton}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={colors.primary}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    )
  );

  // Memoized render function
  const renderFlightCard = useCallback(
    ({ item: flight }: { item: FlightItinerary }) => (
      <FlightCard flight={flight} onSelect={handleFlightSelect} />
    ),
    [handleFlightSelect]
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="search-off" size={64} color={colors.textLight} />
      <H2 style={styles.emptyTitle}>No flights found</H2>
      <P style={styles.emptyDescription}>
        Try adjusting your search criteria or dates
      </P>
      <TouchableOpacity
        style={styles.searchAgainButton}
        onPress={() => navigation.goBack()}
      >
        <P style={styles.searchAgainText}>Search Again</P>
      </TouchableOpacity>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      <LoadingSpinner size="large" />
      <P style={styles.loadingText}>Searching for flights...</P>
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <ScreenWrapper>
        <StatusBar style="dark" />
        <Container style={styles.container}>{renderLoadingState()}</Container>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Flight Results"
        subtitle={`${searchParams ? formatDate(searchParams.departDate) : ""}${
          searchParams?.returnDate
            ? ` • ${formatDate(searchParams.returnDate)}`
            : ""
        }`}
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
        <Container style={styles.container}>
          {/* Results Count */}
          <View style={styles.resultsCount}>
            <P style={styles.resultCount}>
              {filteredResults.length} flight
              {filteredResults.length !== 1 ? "s" : ""} found
            </P>
          </View>

          {/* Sort Options */}
          <View style={styles.sortContainer}>
            {[
              { key: "price", label: "Price" },
              { key: "duration", label: "Duration" },
              { key: "departure", label: "Departure" },
            ].map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.sortButton,
                  sortBy === key && styles.sortButtonActive,
                ]}
                onPress={() => setSortBy(key as any)}
              >
                <P
                  style={[
                    styles.sortButtonText,
                    sortBy === key && styles.sortButtonTextActive,
                  ]}
                >
                  {label}
                </P>
              </TouchableOpacity>
            ))}
          </View>

          {/* Flight List */}
          {filteredResults.length > 0 ? (
            <FlashList
              data={filteredResults}
              renderItem={renderFlightCard}
              keyExtractor={keyExtractor}
              getItemType={getItemType}
              estimatedItemSize={estimatedItemSize}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                />
              }
              contentContainerStyle={styles.listContainer}
              // FlashList performance optimizations
              drawDistance={500}
              overrideItemLayout={(layout, item, index) => {
                layout.size = 200; // Fixed height for better performance
              }}
            />
          ) : (
            renderEmptyState()
          )}
        </Container>
      </Animated.View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  resultsCount: {
    alignItems: "center",
    marginBottom: 20,
  },
  resultCount: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
  },
  sortContainer: {
    flexDirection: "row",
    backgroundColor: colors.gray + "20",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
  sortButtonTextActive: {
    color: colors.white,
  },
  listContainer: {
    paddingBottom: 20,
  },
  flightCard: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceContainer: {
    alignItems: "flex-start",
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  airlineInfo: {
    alignItems: "center",
  },
  airlineLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  airlineInitial: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  airlineName: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  airportInfo: {
    flex: 1,
    alignItems: "center",
  },
  airportCode: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 2,
  },
  airportName: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: colors.textLight,
  },
  flightPath: {
    flex: 1.2,
    alignItems: "center",
    marginHorizontal: 16,
  },
  flightLineContainer: {
    width: "100%",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  flightLine: {
    height: 2,
    backgroundColor: colors.primary,
    width: "100%",
    borderRadius: 1,
  },
  airplaneIconContainer: {
    position: "absolute",
    backgroundColor: colors.primary,
    padding: 4,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  duration: {
    fontSize: 12,
    fontWeight: "600",
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
    fontWeight: "600",
  },
  flightDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 10,
    color: colors.textLight,
  },
  selectButton: {
    alignItems: "flex-end",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  searchAgainButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchAgainText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loadingState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 16,
  },
});

export default EnhancedFlightResultsScreen;
