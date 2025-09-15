import { flightAPI } from '@/config/api';

export interface Place {
    id: string;
    name: string;
    type: 'Airport' | 'City' | 'Country';
    city?: string;
    country?: string;
    code?: string;
    skyId?: string; // Sky ID from the API
    entityId?: string; // Entity ID from the API
}

export interface PlacesSearchResult {
    places: Place[];
    isLoading: boolean;
    error: string | null;
}

class PlacesService {
    private cache = new Map<string, Place[]>();
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    private readonly CACHE_TIMESTAMPS = new Map<string, number>();
    private readonly ERROR_CACHE = new Map<string, number>();
    private readonly ERROR_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    private lastRequestTime = 0;
    private readonly MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
    private consecutiveErrors = 0;
    private readonly MAX_CONSECUTIVE_ERRORS = 3;

    // Search for places with caching and rate limiting
    async searchPlaces(query: string): Promise<Place[]> {
        if (!query || query.length < 2) {
            return [];
        }

        const cacheKey = query.toLowerCase();
        const now = Date.now();

        // Check error cache first
        if (this.ERROR_CACHE.has(cacheKey)) {
            const errorTimestamp = this.ERROR_CACHE.get(cacheKey);
            if (errorTimestamp && (now - errorTimestamp) < this.ERROR_CACHE_DURATION) {
                console.log('Skipping request due to recent error for:', query);
                return [];
            }
        }

        // Check cache
        if (this.cache.has(cacheKey)) {
            const timestamp = this.CACHE_TIMESTAMPS.get(cacheKey);
            if (timestamp && (now - timestamp) < this.CACHE_DURATION) {
                return this.cache.get(cacheKey)!;
            }
        }

        // Enhanced rate limiting
        const timeSinceLastRequest = now - this.lastRequestTime;
        const requiredInterval = this.consecutiveErrors > 0 ?
            this.MIN_REQUEST_INTERVAL * Math.pow(2, this.consecutiveErrors) :
            this.MIN_REQUEST_INTERVAL;

        if (timeSinceLastRequest < requiredInterval) {
            console.log(`Rate limiting: waiting ${requiredInterval}ms before next request (consecutive errors: ${this.consecutiveErrors})`);
            return [];
        }

        // If we have too many consecutive errors, stop making requests
        if (this.consecutiveErrors >= this.MAX_CONSECUTIVE_ERRORS) {
            console.log('Too many consecutive errors, stopping requests temporarily');
            return [];
        }

        this.lastRequestTime = now;

        try {
            const results = await flightAPI.searchPlaces(query);

            // Cache the results
            this.cache.set(cacheKey, results);
            this.CACHE_TIMESTAMPS.set(cacheKey, now);

            // Clear any previous error for this query
            this.ERROR_CACHE.delete(cacheKey);

            // Reset consecutive errors on success
            this.consecutiveErrors = 0;

            return results;
        } catch (error: any) {
            console.error('Places search error:', error);

            // Increment consecutive errors
            this.consecutiveErrors++;

            // Cache the error to prevent immediate retries
            this.ERROR_CACHE.set(cacheKey, now);

            // If it's a 429 error, increase the wait time significantly
            if (error.response?.status === 429) {
                this.lastRequestTime = now + (5000 * this.consecutiveErrors); // Exponential backoff
                console.log(`429 error: waiting ${5000 * this.consecutiveErrors}ms before next request`);
            }

            return [];
        }
    }

    // Get popular destinations
    async getPopularDestinations(): Promise<Place[]> {
        const popularQueries = ['London', 'Paris', 'New York', 'Dubai', 'Tokyo'];
        const results: Place[] = [];

        for (const query of popularQueries) {
            try {
                const places = await this.searchPlaces(query);
                const bestMatch = places.find(p => p.type === 'City' || p.type === 'Airport');
                if (bestMatch) {
                    results.push(bestMatch);
                }
            } catch (error) {
                console.error(`Error getting popular destination for ${query}:`, error);
            }
        }

        return results;
    }

    // Get recent searches (this would typically come from local storage)
    getRecentSearches(): Place[] {
        // In a real app, this would come from AsyncStorage or similar
        // For now, return empty array since we want only API data
        return [];
    }

    // Clear cache
    clearCache(): void {
        this.cache.clear();
        this.CACHE_TIMESTAMPS.clear();
        this.ERROR_CACHE.clear();
        this.consecutiveErrors = 0;
        this.lastRequestTime = 0;
    }

    // Reset rate limiting (call when modal closes)
    resetRateLimit(): void {
        this.consecutiveErrors = 0;
        this.lastRequestTime = 0;
    }

    // Get current location (would use real location services)
    getCurrentLocation(): Place | null {
        // In a real app, this would use expo-location or similar
        // For now, return null since we want only API data
        return null;
    }

    // Format place for display
    formatPlace(place: Place): string {
        if (place.type === 'Airport') {
            return `${place.name} (${place.code}) - ${place.city}, ${place.country}`;
        }
        return `${place.name}, ${place.country}`;
    }

    // Get place display name
    getDisplayName(place: Place): string {
        if (place.type === 'Airport' && place.code) {
            return `${place.code} - ${place.name}`;
        }
        return place.name;
    }

    // Get place subtitle
    getSubtitle(place: Place): string {
        if (place.type === 'Airport') {
            return `${place.city}, ${place.country}`;
        }
        return place.country || '';
    }
}

export const placesService = new PlacesService();
