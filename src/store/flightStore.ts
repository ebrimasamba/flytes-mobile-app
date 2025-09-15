import { create } from 'zustand';
import { FlightSearchParams, FlightSearchResponse, FlightItinerary, BookingDetails } from '@/types/flight';
import { flightAPI } from '@/config/api';
import { placesService, Place } from '@/services/placesService';

interface FlightState {
    // Search state
    searchParams: FlightSearchParams | null;
    searchResults: FlightSearchResponse | null;
    isLoading: boolean;
    error: string | null;

    // Places search state
    placesResults: Place[];
    placesLoading: boolean;
    placesError: string | null;

    // Selected flight
    selectedFlight: FlightItinerary | null;

    // Booking state
    bookingDetails: BookingDetails | null;
    isBooking: boolean;
    bookingError: string | null;

    // Recent searches
    recentSearches: FlightSearchParams[];

    // Actions
    setSearchParams: (params: FlightSearchParams) => void;
    searchFlights: (params: FlightSearchParams) => Promise<void>;
    setSelectedFlight: (flight: FlightItinerary) => void;
    setBookingDetails: (details: BookingDetails) => void;
    createBooking: () => Promise<void>;
    addRecentSearch: (search: FlightSearchParams) => void;
    clearSearchResults: () => void;
    clearError: () => void;

    // Places search actions
    searchPlaces: (query: string) => Promise<void>;
    clearPlacesResults: () => void;
    getPopularDestinations: () => Promise<Place[]>;
    getRecentSearches: () => Place[];
}

export const useFlightStore = create<FlightState>((set, get) => ({
    // Initial state
    searchParams: null,
    searchResults: null,
    isLoading: false,
    error: null,

    // Places search state
    placesResults: [],
    placesLoading: false,
    placesError: null,
    selectedFlight: null,
    bookingDetails: null,
    isBooking: false,
    bookingError: null,
    recentSearches: [],

    // Actions
    setSearchParams: (params: FlightSearchParams) => {
        set({ searchParams: params });
    },

    searchFlights: async (params: FlightSearchParams) => {
        set({ isLoading: true, error: null });

        try {
            // Convert place-based params to API format if needed
            const apiParams = {
                ...params,
                from: typeof params.from === 'object' && params.from ? params.from.id : params.from as string,
                to: typeof params.to === 'object' && params.to ? params.to.id : params.to as string,
            };

            const results = await flightAPI.searchFlights(apiParams);
            set({
                searchResults: results,
                isLoading: false,
                searchParams: params,
            });

            // Add to recent searches
            get().addRecentSearch(params);
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to search flights',
            });
        }
    },

    setSelectedFlight: (flight: FlightItinerary) => {
        set({ selectedFlight: flight });
    },

    setBookingDetails: (details: BookingDetails) => {
        set({ bookingDetails: details });
    },

    createBooking: async () => {
        const { selectedFlight, bookingDetails } = get();

        if (!selectedFlight || !bookingDetails) {
            set({ bookingError: 'Missing flight or booking details' });
            return;
        }

        set({ isBooking: true, bookingError: null });

        try {
            await flightAPI.createBooking(bookingDetails);
            set({ isBooking: false });
            // Handle successful booking
        } catch (error) {
            set({
                isBooking: false,
                bookingError: error instanceof Error ? error.message : 'Failed to create booking',
            });
        }
    },

    addRecentSearch: (search: FlightSearchParams) => {
        const { recentSearches } = get();
        const newSearches = [search, ...recentSearches.filter(s =>
            s.from !== search.from || s.to !== search.to || s.departDate !== search.departDate
        )].slice(0, 10); // Keep only last 10 searches

        set({ recentSearches: newSearches });
    },

    clearSearchResults: () => {
        set({ searchResults: null, selectedFlight: null });
    },

    clearError: () => {
        set({ error: null, bookingError: null });
    },

    // Places search actions
    searchPlaces: async (query: string) => {
        set({ placesLoading: true, placesError: null });

        try {
            const results = await placesService.searchPlaces(query);
            set({
                placesResults: results,
                placesLoading: false
            });
        } catch (error) {
            set({
                placesLoading: false,
                placesError: error instanceof Error ? error.message : 'Failed to search places',
            });
        }
    },

    clearPlacesResults: () => {
        set({ placesResults: [], placesError: null });
    },

    getPopularDestinations: async () => {
        try {
            return await placesService.getPopularDestinations();
        } catch (error) {
            console.error('Error getting popular destinations:', error);
            return [];
        }
    },

    getRecentSearches: () => {
        return placesService.getRecentSearches();
    },
}));
