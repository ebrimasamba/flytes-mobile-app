// Flight API Types based on Sky-Scrapper API
export interface FlightSearchParams {
    from: string; // Airport skyId
    to: string; // Airport skyId
    originEntityId?: string; // Airport entityId
    destinationEntityId?: string; // Airport entityId
    departDate: string; // YYYY-MM-DD format
    returnDate?: string; // YYYY-MM-DD format for round trips
    adults: number;
    children?: number;
    infants?: number;
    cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
    currency: string;
    sortBy?: string; // Sort order (e.g., 'best', 'price', 'duration')
    market?: string; // Market locale (e.g., 'en-US')
    countryCode?: string; // Country code (e.g., 'US')
}

// Updated types to match the new API response format
export interface FlightPlace {
    id: string;
    name: string;
    displayCode: string;
    city?: string;
    isHighlighted?: boolean;
    flightPlaceId?: string;
    type?: string;
    parent?: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
    };
}

export interface Carrier {
    id: number;
    name: string;
    logoUrl?: string;
    alternateId?: string;
    allianceId?: number;
}

export interface Carriers {
    marketing: Carrier[];
    operationType: string;
}

export interface FlightSegment {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    departure: string; // ISO 8601 format
    arrival: string; // ISO 8601 format
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
}

export interface FlightLeg {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string; // ISO 8601 format
    arrival: string; // ISO 8601 format
    timeDeltaInDays: number;
    carriers: Carriers;
    segments: FlightSegment[];
}

export interface FarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
}

export interface Eco {
    ecoContenderDelta: number;
}

export interface FlightItinerary {
    id: string;
    price: {
        raw: number;
        formatted: string;
    };
    legs: FlightLeg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: FarePolicy;
    eco: Eco;
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
}

export interface FlightSearchResponse {
    status: boolean;
    timestamp: number;
    sessionId: string;
    data: {
        context: {
            status: string;
            totalResults: number;
        };
        itineraries: FlightItinerary[];
        places: {
            city: string;
            airports: {
                id: string;
                name: string;
            }[];
        }[];
        carriers: Carrier[];
        stopPrices: {
            direct: {
                isPresent: boolean;
                formattedPrice?: string;
            };
            one: {
                isPresent: boolean;
                formattedPrice?: string;
            };
            twoOrMore: {
                isPresent: boolean;
                formattedPrice?: string;
            };
        };
    };
}

export interface BookingDetails {
    passengers: {
        adults: Passenger[];
        children?: Passenger[];
        infants?: Passenger[];
    };
    contact: {
        email: string;
        phone: string;
    };
    payment: PaymentDetails;
}

export interface Passenger {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    passportNumber?: string;
    passportExpiry?: string;
    nationality?: string;
}

export interface PaymentDetails {
    method: 'card' | 'paypal' | 'bank_transfer';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
    billingAddress?: Address;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface BookingResponse {
    bookingId: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    passengers: Passenger[];
    itinerary: FlightItinerary;
    totalPrice: number;
    currency: string;
    confirmationCode: string;
    bookingDate: string;
}
