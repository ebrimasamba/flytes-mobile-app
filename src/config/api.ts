import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { FlightSearchParams, FlightSearchResponse, BookingDetails, BookingResponse } from '@/types/flight';

// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights',
    HEADERS: {
        'x-rapidapi-key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        'Content-Type': 'application/json',
    },
};

// API Endpoints
export const API_ENDPOINTS = {
    // Skyscanner API endpoints
    GET_NEARBY_AIRPORTS: '/getNearByAirports',
    SEARCH_AIRPORT: '/searchAirport',
    SEARCH_FLIGHTS: '/searchFlights',
    SEARCH_FLIGHTS_COMPLETE: '/searchFlightsComplete',
    SEARCH_INCOMPLETE: '/searchIncomplete',
    GET_FLIGHT_DETAILS: '/getFlightDetails',
    GET_PRICE_CALENDAR: '/getPriceCalendar',
    SEARCH_FLIGHTS_MULTI_STOPS: '/searchFlightsMultiStops',
    SEARCH_FLIGHT_EVERYWHERE: '/searchFlightEverywhere',
    SEARCH_FLIGHT_EVERYWHERE_DETAILS: '/searchFlightEverywhereDetails',
    SEARCH_FLIGHTS_WEB_COMPLETE: '/searchFlightsWebComplete',
} as const;

// Default search parameters
export const DEFAULT_SEARCH_PARAMS: Partial<FlightSearchParams> = {
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'economy',
    currency: 'USD',
};

// API Service Class
export class FlightAPIService {
    private static instance: FlightAPIService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            headers: API_CONFIG.HEADERS,
            timeout: 30000, // 30 seconds timeout
        });

        // Add request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
                return config;
            },
            (error) => {
                console.error('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                console.log(`Response received from: ${response.config.url}`);
                return response;
            },
            (error) => {
                // Don't log 404 errors as they're expected for non-existent endpoints
                if (error.response?.status !== 404) {
                    console.error('Response interceptor error:', error);
                    if (error.response) {
                        console.error('Response error:', error.response.status, error.response.data);
                    } else if (error.request) {
                        console.error('Request error:', error.request);
                    } else {
                        console.error('Error:', error.message);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): FlightAPIService {
        if (!FlightAPIService.instance) {
            FlightAPIService.instance = new FlightAPIService();
        }
        return FlightAPIService.instance;
    }

    private async makeRequest<T>(
        endpoint: string,
        params?: Record<string, any>,
        method: 'GET' | 'POST' = 'GET'
    ): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                method,
                url: endpoint,
            };

            if (method === 'GET' && params) {
                config.params = params;
            } else if (method === 'POST' && params) {
                config.data = params;
            }

            const response = await this.axiosInstance.request<T>(config);
            return response.data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Search for flights using Skyscanner API
    async searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
        // Convert our parameters to the API's expected format
        const searchParams = {
            originSkyId: params.from, // Use the skyId from airport search
            destinationSkyId: params.to, // Use the skyId from airport search
            originEntityId: params.originEntityId, // Use the entityId from airport search
            destinationEntityId: params.destinationEntityId, // Use the entityId from airport search
            date: params.departDate, // Format: YYYY-MM-DD
            returnDate: params.returnDate, // Format: YYYY-MM-DD (optional)
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: params.sortBy || 'best',
            market: params.market || 'en-US',
            countryCode: params.countryCode || 'US',
        };

        console.log("Sending flight search params:", searchParams);
        const results = await this.makeRequest(API_ENDPOINTS.SEARCH_FLIGHTS, searchParams, 'GET');
        console.log("SEARCH FLIGHTS RESULTS", results);
        return this.transformSkyscannerResults(results);
    }

    // Search for flights with complete results
    async searchFlightsComplete(params: FlightSearchParams): Promise<FlightSearchResponse> {
        const searchParams = {
            originSkyId: params.from,
            destinationSkyId: params.to,
            originEntityId: params.originEntityId,
            destinationEntityId: params.destinationEntityId,
            date: params.departDate,
            returnDate: params.returnDate,
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: params.sortBy || 'best',
            market: params.market || 'en-US',
            countryCode: params.countryCode || 'US',
        };

        const results = await this.makeRequest(API_ENDPOINTS.SEARCH_FLIGHTS_COMPLETE, searchParams, 'GET');
        return this.transformSkyscannerResults(results);
    }

    // Search for incomplete flights
    async searchIncomplete(params: FlightSearchParams): Promise<FlightSearchResponse> {
        const searchParams = {
            originSkyId: params.from,
            destinationSkyId: params.to,
            originEntityId: params.originEntityId,
            destinationEntityId: params.destinationEntityId,
            date: params.departDate,
            returnDate: params.returnDate,
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: params.sortBy || 'best',
            market: params.market || 'en-US',
            countryCode: params.countryCode || 'US',
        };

        const results = await this.makeRequest(API_ENDPOINTS.SEARCH_INCOMPLETE, searchParams, 'GET');
        return this.transformSkyscannerResults(results);
    }

    // Transform Skyscanner results to our format
    private transformSkyscannerResults(skyscannerData: any): FlightSearchResponse {
        // The new API response format already matches our expected structure
        // Just return it directly as it's already in the correct format
        if (skyscannerData && skyscannerData.status && skyscannerData.data) {
            return skyscannerData as FlightSearchResponse;
        }

        // Fallback for old format or error cases
        return {
            status: false,
            timestamp: Date.now(),
            sessionId: `session-${Date.now()}`,
            data: {
                context: {
                    status: 'error',
                    totalResults: 0,
                },
                itineraries: [],
                places: [],
                carriers: [],
                stopPrices: {
                    direct: { isPresent: false },
                    one: { isPresent: false },
                    twoOrMore: { isPresent: false },
                },
            },
        };
    }

    // Get flight details
    async getFlightDetails(flightId: string): Promise<any> {
        return this.makeRequest(API_ENDPOINTS.GET_FLIGHT_DETAILS, { flightId }, 'GET');
    }

    // Search for airports using Skyscanner API
    async searchAirport(query: string): Promise<any[]> {
        try {
            const response = await this.makeRequest(API_ENDPOINTS.SEARCH_AIRPORT, { query }, 'GET');
            console.log('Airport search response:', response);

            // Handle the new API response format
            if (response && (response as any).data && Array.isArray((response as any).data)) {
                return (response as any).data.map((item: any) => {
                    // Extract data from the presentation object
                    const presentation = item.presentation || {};
                    const navigation = item.navigation || {};

                    return {
                        id: item.entityId || item.skyId || `airport-${Date.now()}`,
                        name: presentation.title || presentation.name || item.skyId || 'Unknown Airport',
                        type: 'Airport',
                        city: presentation.subtitle || navigation.city || 'Unknown City',
                        country: navigation.country || 'Unknown Country',
                        code: item.skyId || presentation.code || '',
                        entityId: item.entityId,
                        skyId: item.skyId,
                    };
                });
            }

            return [];
        } catch (error: any) {
            // If endpoint doesn't exist (404), return empty array instead of throwing
            if (error.response?.status === 404) {
                console.log('Airport search endpoint not available, returning empty results');
                return [];
            }
            throw error;
        }
    }

    // Get nearby airports
    async getNearbyAirports(latitude: number, longitude: number, radius?: number): Promise<any[]> {
        const params: any = { latitude, longitude };
        if (radius) params.radius = radius;

        const response = await this.makeRequest(API_ENDPOINTS.GET_NEARBY_AIRPORTS, params, 'GET');
        return (response as any).airports || [];
    }

    // Get price calendar
    async getPriceCalendar(params: { from: string; to: string; departDate: string; returnDate?: string }): Promise<any> {
        return this.makeRequest(API_ENDPOINTS.GET_PRICE_CALENDAR, params, 'GET');
    }

    // Search flights with multiple stops
    async searchFlightsMultiStops(params: FlightSearchParams): Promise<FlightSearchResponse> {
        const searchParams = {
            originSkyId: params.from,
            destinationSkyId: params.to,
            originEntityId: params.originEntityId,
            destinationEntityId: params.destinationEntityId,
            date: params.departDate,
            returnDate: params.returnDate,
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: params.sortBy || 'best',
            market: params.market || 'en-US',
            countryCode: params.countryCode || 'US',
        };

        const results = await this.makeRequest(API_ENDPOINTS.SEARCH_FLIGHTS_MULTI_STOPS, searchParams, 'GET');
        return this.transformSkyscannerResults(results);
    }

    // Search flights everywhere
    async searchFlightEverywhere(params: { from: string; departDate: string; returnDate?: string; adults?: number; children?: number; infants?: number; cabinClass?: string; currency?: string }): Promise<any> {
        const searchParams = {
            originSkyId: params.from,
            date: params.departDate,
            returnDate: params.returnDate,
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: 'best',
            market: 'en-US',
            countryCode: 'US',
        };
        return this.makeRequest(API_ENDPOINTS.SEARCH_FLIGHT_EVERYWHERE, searchParams, 'GET');
    }

    // Search flight everywhere details
    async searchFlightEverywhereDetails(params: { from: string; to: string; departDate: string; returnDate?: string; adults?: number; children?: number; infants?: number; cabinClass?: string; currency?: string }): Promise<FlightSearchResponse> {
        const searchParams = {
            originSkyId: params.from,
            destinationSkyId: params.to,
            date: params.departDate,
            returnDate: params.returnDate,
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: 'best',
            market: 'en-US',
            countryCode: 'US',
        };
        const results = await this.makeRequest(API_ENDPOINTS.SEARCH_FLIGHT_EVERYWHERE_DETAILS, searchParams, 'GET');
        return this.transformSkyscannerResults(results);
    }

    // Search flights web complete
    async searchFlightsWebComplete(params: FlightSearchParams): Promise<FlightSearchResponse> {
        const searchParams = {
            originSkyId: params.from,
            destinationSkyId: params.to,
            originEntityId: params.originEntityId,
            destinationEntityId: params.destinationEntityId,
            date: params.departDate,
            returnDate: params.returnDate,
            adults: params.adults || 1,
            children: params.children || 0,
            infants: params.infants || 0,
            cabinClass: params.cabinClass || 'economy',
            currency: params.currency || 'USD',
            sortBy: params.sortBy || 'best',
            market: params.market || 'en-US',
            countryCode: params.countryCode || 'US',
        };

        const results = await this.makeRequest(API_ENDPOINTS.SEARCH_FLIGHTS_WEB_COMPLETE, searchParams, 'GET');
        return this.transformSkyscannerResults(results);
    }

    // Legacy method for backward compatibility
    async searchPlaces(query: string): Promise<any[]> {
        return this.searchAirport(query);
    }


    // Create booking
    async createBooking(bookingDetails: BookingDetails): Promise<BookingResponse> {
        // Note: This would typically call a booking endpoint
        // For now, we'll throw an error since we don't have a booking endpoint
        throw new Error('Booking functionality not implemented - no booking endpoint available');
    }
}

// Export singleton instance
export const flightAPI = FlightAPIService.getInstance();
