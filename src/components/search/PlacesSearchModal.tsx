import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Modal } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFlightStore } from "@/store/flightStore";
import { placesService, Place } from "@/services/placesService";
import { colors } from "@/styles";
import { H3, P } from "@/components/typography";

interface PlacesSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
  title: string;
  placeholder?: string;
}

const PlacesSearchModal: React.FC<PlacesSearchModalProps> = ({
  visible,
  onClose,
  onSelectPlace,
  title,
  placeholder = "Search for airports or cities...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popularDestinations, setPopularDestinations] = useState<Place[]>([]);
  const [recentSearches, setRecentSearches] = useState<Place[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);

  const {
    placesResults,
    placesLoading,
    placesError,
    searchPlaces,
    clearPlacesResults,
    getPopularDestinations,
    getRecentSearches,
  } = useFlightStore();

  // Memoize the loadInitialData function to prevent unnecessary re-renders
  const loadInitialData = useCallback(async () => {
    setIsLoadingPopular(true);
    try {
      const [popular, recent] = await Promise.all([
        getPopularDestinations(),
        Promise.resolve(getRecentSearches()),
      ]);
      setPopularDestinations(popular);
      setRecentSearches(recent);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setIsLoadingPopular(false);
    }
  }, [getPopularDestinations, getRecentSearches]);

  // Load initial data when modal opens
  useEffect(() => {
    if (visible) {
      loadInitialData();
    } else {
      // Reset state when modal closes
      setSearchQuery("");
      clearPlacesResults();
      // Reset rate limiting to allow fresh requests when modal reopens
      placesService.resetRateLimit();
    }
  }, [visible, loadInitialData, clearPlacesResults]);

  // Memoize the search function to prevent unnecessary re-renders
  const debouncedSearch = useCallback(
    (query: string) => {
      if (query.trim().length >= 2) {
        searchPlaces(query.trim());
      } else {
        clearPlacesResults();
      }
    },
    [searchPlaces, clearPlacesResults]
  );

  // Debounced search with longer delay to prevent API spam
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 1500); // Increased to 1.5 seconds to prevent 429 errors

    return () => clearTimeout(timeoutId);
  }, [searchQuery, debouncedSearch]);

  const handleSelectPlace = useCallback(
    (place: Place) => {
      onSelectPlace(place);
      onClose();
    },
    [onSelectPlace, onClose]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const renderPlaceItem = useCallback(
    ({ item }: { item: Place }) => (
      <TouchableOpacity
        style={styles.placeItem}
        onPress={() => handleSelectPlace(item)}
      >
        <View style={styles.placeIcon}>
          <MaterialIcons
            name={
              item.type === "Airport"
                ? "flight"
                : item.type === "City"
                ? "location-city"
                : "public"
            }
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>
            {placesService.getDisplayName(item)}
          </Text>
          <Text style={styles.placeSubtitle}>
            {placesService.getSubtitle(item)}
          </Text>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={colors.textLight}
        />
      </TouchableOpacity>
    ),
    [handleSelectPlace]
  );

  const renderSection = useCallback(
    (title: string, data: Place[], isLoading: boolean = false) => {
      if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <P style={styles.loadingText}>Loading {title.toLowerCase()}...</P>
          </View>
        );
      }

      if (data.length === 0) {
        return null;
      }

      return (
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>{title}</H3>
          <FlatList
            data={data}
            renderItem={renderPlaceItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        </View>
      );
    },
    [renderPlaceItem]
  );

  // Memoize display data to prevent unnecessary re-renders
  const displayData = useMemo(() => {
    if (searchQuery.trim().length >= 2) {
      return {
        title: "Search Results",
        data: placesResults,
        isLoading: placesLoading,
      };
    }

    return {
      title: "Popular Destinations",
      data: popularDestinations,
      isLoading: isLoadingPopular,
    };
  }, [
    searchQuery,
    placesResults,
    placesLoading,
    popularDestinations,
    isLoadingPopular,
  ]);

  const {
    title: displayTitle,
    data: displayDataArray,
    isLoading,
  } = displayData;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={20}
            color={colors.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <MaterialIcons name="clear" size={20} color={colors.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {placesError && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error" size={20} color={colors.error} />
              <P style={styles.errorText}>{placesError}</P>
            </View>
          )}

          {searchQuery.trim().length === 0 ? (
            <View style={styles.sectionsContainer}>
              {renderSection("Recent Searches", recentSearches)}
              {renderSection(
                "Popular Destinations",
                popularDestinations,
                isLoadingPopular
              )}
            </View>
          ) : (
            <View style={styles.resultsContainer}>
              {renderSection(displayTitle, displayDataArray, isLoading)}
            </View>
          )}

          {searchQuery.trim().length >= 2 &&
            placesResults.length === 0 &&
            !placesLoading && (
              <View style={styles.noResultsContainer}>
                <MaterialIcons
                  name="search-off"
                  size={48}
                  color={colors.textLight}
                />
                <H3 style={styles.noResultsTitle}>No Results Found</H3>
                <P style={styles.noResultsText}>
                  Try searching for a different city or airport
                </P>
              </View>
            )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionsContainer: {
    flex: 1,
  },
  resultsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  placeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 2,
  },
  placeSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    color: colors.textLight,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.errorLight,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    marginLeft: 8,
    color: colors.error,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    textAlign: "center",
    color: colors.textLight,
    paddingHorizontal: 32,
  },
});

export default PlacesSearchModal;
