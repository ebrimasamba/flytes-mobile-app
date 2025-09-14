import { mixins, colors } from "@/styles";
import { FlashList } from "@shopify/flash-list";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import { SUGGESTED_PLACES } from "@/constants";

import { H2, P } from "@/components/typography";
import Input from "@/components/inputs/Input";
import Container from "@/components/misc/Container";
import SearchItem from "@/components/misc/SearchItem";

const SearchModalScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState([
    { name: "London", type: "City", country: "United Kingdom", isRecent: true },
    {
      name: "Dubai International",
      type: "Airport",
      country: "UAE",
      airportCode: "DXB",
      isRecent: true,
    },
    { name: "Paris", type: "City", country: "France", isRecent: true },
  ]);

  // Simulate search with debounce
  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        // Simulate API search results
        const mockResults = [
          {
            name: "London Heathrow",
            type: "Airport",
            country: "United Kingdom",
            airportCode: "LHR",
            isPopular: true,
          },
          {
            name: "London",
            type: "City",
            country: "United Kingdom",
            distance: "2.3 km",
          },
          {
            name: "London Gatwick",
            type: "Airport",
            country: "United Kingdom",
            airportCode: "LGW",
          },
        ].filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const sectionList = useMemo(() => {
    if (searchQuery.length > 0) {
      if (isSearching) {
        return [{ isLoading: true, id: "loading" }];
      }
      if (searchResults.length === 0) {
        return [{ isEmpty: true, id: "empty" }];
      }
      return [
        { isHeader: true, title: "Search Results", id: "search-header" },
        ...searchResults,
      ];
    }

    return [
      {
        name: "Current Location",
        type: "location",
        country: "Gambia",
        isCurrentLocation: true,
      },
      { isHeader: true, title: "Recent Searches", id: "recent-header" },
      ...recentSearches,
      { isHeader: true, title: "Popular Destinations", id: "popular-header" },
      ...SUGGESTED_PLACES.map((place) => ({ ...place, isPopular: true })),
    ];
  }, [searchQuery, searchResults, isSearching, recentSearches]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    Keyboard.dismiss();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      if (item.isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        );
      }

      if (item.isEmpty) {
        return (
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="search-off"
              size={48}
              color={colors.textLight}
            />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching for a different city or airport
            </Text>
          </View>
        );
      }

      if (item.isHeader) {
        return (
          <View style={styles.headerRow}>
            <H2 style={styles.listHeaderTitle}>{item.title}</H2>
            {item.id === "recent-header" && recentSearches.length > 0 && (
              <TouchableOpacity
                onPress={clearRecentSearches}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }

      return (
        <SearchItem
          name={item.name}
          type={item.type}
          country={item.country}
          airportCode={item.airportCode}
          distance={item.distance}
          isPopular={item.isPopular}
          isRecent={item.isRecent}
          onPress={() => {
            // Handle selection
            navigation.goBack();
          }}
        />
      );
    },
    [recentSearches.length, navigation]
  );

  const renderSearchSuggestions = () => {
    const quickSearches = ["London", "New York", "Dubai", "Paris"];

    return (
      <View style={styles.quickSearchContainer}>
        <Text style={styles.quickSearchLabel}>Quick searches</Text>
        <View style={styles.quickSearchTags}>
          {quickSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickSearchTag}
              onPress={() => setSearchQuery(search)}
            >
              <MaterialIcons
                name="trending-up"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.quickSearchText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={mixins.wrapper}>
      {/* Enhanced Header */}
      <View style={styles.headerContainer}>
        <Container style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <H2 style={styles.headerTitle}>Where from?</H2>
            <P style={styles.headerSubtitle}>Search cities and airports</P>
          </View>
        </Container>
      </View>

      {/* Enhanced Search Input */}
      <View style={styles.searchSection}>
        <Container style={styles.inputContainer}>
          <View style={styles.searchInputWrapper}>
            <Input
              autoFocus
              placeholder="Search for a city or airport"
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={
                <MaterialIcons
                  name="search"
                  size={20}
                  color={colors.textLight}
                />
              }
              rightIcon={
                searchQuery.length > 0 ? (
                  <TouchableOpacity onPress={clearSearch}>
                    <MaterialIcons
                      name="close"
                      size={20}
                      color={colors.textLight}
                    />
                  </TouchableOpacity>
                ) : undefined
              }
              containerStyle={styles.searchInput}
            />
          </View>
          {searchQuery.length === 0 && renderSearchSuggestions()}
        </Container>
      </View>

      {/* Results List */}
      <Container style={styles.listContainer}>
        <FlashList
          keyboardShouldPersistTaps="always"
          data={sectionList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </Container>

      {/* Filter Bar */}
      {searchQuery.length > 0 && (
        <View style={styles.filterBar}>
          <Container>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[styles.filterButton, styles.filterButtonActive]}
              >
                <MaterialIcons name="place" size={16} color={colors.white} />
                <Text style={[styles.filterText, styles.filterTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <MaterialIcons
                  name="flight-takeoff"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.filterText}>Airports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <MaterialIcons
                  name="location-city"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.filterText}>Cities</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray + "20",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
  },
  searchSection: {
    backgroundColor: colors.white,
    paddingBottom: 8,
  },
  inputContainer: {
    paddingTop: 20,
  },
  searchInputWrapper: {
    marginBottom: 16,
  },
  searchInput: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickSearchContainer: {
    marginBottom: 8,
  },
  quickSearchLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textLight,
    marginBottom: 12,
  },
  quickSearchTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickSearchTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.primary + "10",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary + "20",
  },
  quickSearchText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  listContent: {
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.gray + "15",
    borderRadius: 12,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  separator: {
    height: 4,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 20,
  },
  filterBar: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary + "30",
    backgroundColor: colors.white,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  filterTextActive: {
    color: colors.white,
  },
});

export default SearchModalScreen;
