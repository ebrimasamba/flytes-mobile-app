# Sky-Scrapper API Integration Setup

This document explains how to set up the Sky-Scrapper API integration for the Google Flights app.

## Prerequisites

1. A RapidAPI account
2. Subscription to the Sky-Scrapper API

## Setup Steps

### 1. Get Your RapidAPI Key

1. Go to [Sky-Scrapper API on RapidAPI](https://rapidapi.com/apiheya/api/sky-scrapper)
2. Subscribe to the API (there's usually a free tier available)
3. Copy your RapidAPI key from the dashboard

### 2. Configure Environment Variables

Create a `.env` file in the root directory of your project:

```bash
# Sky-Scrapper API Configuration
EXPO_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
```

Replace `your_rapidapi_key_here` with your actual RapidAPI key.

### 3. API Endpoints

The app uses the following Sky-Scrapper API endpoints:

- **Flight Search**: `/v1/flights/search`
- **Flight Details**: `/v1/flights/details`
- **Flight Booking**: `/v1/flights/booking`
- **Airports Search**: `/v1/airports/search`
- **Airlines**: `/v1/airlines`
- **Currencies**: `/v1/currencies`

### 4. Mock Data Mode

If you don't configure the API key, the app will automatically use mock data for demonstration purposes. This allows you to test the app without setting up the API first.

## API Usage

### Flight Search Parameters

```typescript
interface FlightSearchParams {
  from: string; // Airport code or city
  to: string; // Airport code or city
  departDate: string; // YYYY-MM-DD format
  returnDate?: string; // YYYY-MM-DD format for round trips
  adults: number; // Number of adult passengers
  children?: number; // Number of child passengers
  infants?: number; // Number of infant passengers
  cabinClass: string; // 'economy', 'premium_economy', 'business', 'first'
  currency: string; // Currency code (USD, EUR, etc.)
}
```

### Example API Call

```typescript
import { flightAPI } from "@/config/api";

const searchParams = {
  from: "LHR",
  to: "JFK",
  departDate: "2024-12-25",
  returnDate: "2025-01-02",
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: "economy",
  currency: "USD",
};

const results = await flightAPI.searchFlights(searchParams);
```

## Features Implemented

### 1. Flight Search Screen

- Trip type selection (Round Trip / One Way)
- Location input with swap functionality
- Date selection
- Passenger count configuration
- Recent searches history

### 2. Flight Results Screen

- Flight listing with sorting options
- Price comparison
- Flight duration and stops information
- Airline details
- Refresh functionality

### 3. Flight Details Screen

- Detailed flight information
- Price breakdown
- Flight segments
- Baggage information
- Share and booking options

### 4. Flight Booking Screen

- Multi-step booking process
- Passenger information collection
- Contact details
- Payment method selection
- Booking confirmation

### 5. State Management

- Zustand store for flight data
- Persistent search history
- Booking state management

## Error Handling

The app includes comprehensive error handling:

- API connectivity issues
- Invalid search parameters
- Booking failures
- Network timeouts

## Testing

### With API Key

1. Configure your RapidAPI key
2. Run the app
3. Search for flights using real API data

### Without API Key (Mock Mode)

1. Run the app without configuring the API key
2. The app will use mock data automatically
3. All features work the same way with sample data

## Troubleshooting

### Common Issues

1. **API Key Not Working**

   - Verify your RapidAPI key is correct
   - Check if your subscription is active
   - Ensure you have sufficient quota

2. **No Flight Results**

   - Try different date ranges
   - Check if the airports/cities are valid
   - Verify your search parameters

3. **Booking Failures**
   - Ensure all required fields are filled
   - Check payment method configuration
   - Verify passenger information

### Debug Mode

Enable debug logging by setting:

```bash
EXPO_PUBLIC_DEBUG=true
```

This will log API requests and responses to the console.

## Support

For API-related issues:

- Check the [Sky-Scrapper API documentation](https://rapidapi.com/apiheya/api/sky-scrapper)
- Contact RapidAPI support
- Check the API status page

For app-related issues:

- Check the console logs
- Verify environment configuration
- Test with mock data first
