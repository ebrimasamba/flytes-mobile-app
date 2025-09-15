# Skyscanner API Integration Setup

This guide will help you set up the Skyscanner API integration for your React Native flight search app.

## 🚀 Quick Start

### 1. Get Skyscanner API Access

1. **Visit RapidAPI**: Go to [RapidAPI Skyscanner](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
2. **Subscribe to the API**: Choose a plan that suits your needs
3. **Get your API Key**: Copy your RapidAPI key from the dashboard

### 2. Configure Environment Variables

Create a `.env` file in your project root (if not already exists):

```bash
# Add your RapidAPI key here
EXPO_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
```

**Important**: Make sure the environment variable starts with `EXPO_PUBLIC_` for Expo to recognize it.

### 3. API Configuration

The app is already configured to use the Skyscanner API with the following endpoints:

- **Flight Search**: `/v3/flights/live/search/create`
- **Poll Results**: `/v3/flights/live/search/poll`
- **Places Search**: `/v3/autosuggest/flights`
- **Currencies**: `/v3/locales/currencies`

## 🔧 Features Implemented

### ✅ Flight Search

- **Real-time flight search** using Skyscanner's live search API
- **Polling mechanism** for search results (handles async search)
- **Automatic fallback** to mock data when API key is not configured

### ✅ Places Search

- **Airport and city autocomplete** using Skyscanner's autosuggest API
- **Caching system** for improved performance
- **Popular destinations** and recent searches
- **Smart search** with debouncing

### ✅ Enhanced UI Components

- **PlaceInput**: Dropdown with search functionality
- **PlacesSearchModal**: Full-screen search with categories
- **FormikPlaceInput**: Form integration with validation

### ✅ Form Validation

- **Enhanced schemas** with place validation
- **Real-time validation** using Zod
- **Error handling** and user feedback

## 📱 New Screens

### SkyscannerFlightSearchScreen

- **Place-based search** instead of text input
- **Enhanced UX** with visual place selection
- **Real-time validation** and error handling
- **Recent searches** integration

## 🛠 Technical Implementation

### API Service Architecture

```typescript
// Three-step search process:
1. Create search session
2. Poll for results (up to 30 attempts)
3. Transform results to app format
```

### Places Service

```typescript
// Features:
- Debounced search (300ms delay)
- 5-minute caching
- Popular destinations
- Recent searches
- Error handling
```

### State Management

```typescript
// Enhanced flight store with:
- Places search state
- Caching mechanisms
- Error handling
- Loading states
```

## 🔍 Testing Without API Key

The app works perfectly without an API key using mock data:

- **Mock flights**: Realistic flight data for testing
- **Mock places**: Popular airports and cities
- **Mock bookings**: Complete booking flow simulation

## 📊 API Response Transformation

The app transforms Skyscanner's API responses to match our internal format:

```typescript
// Skyscanner format → App format
{
  content: {
    results: {
      itineraries: [...]
    }
  }
} → {
  searchId: string,
  itineraries: [...],
  currency: string,
  meta: {...}
}
```

## 🚨 Error Handling

- **Network errors**: Graceful fallback to mock data
- **API errors**: User-friendly error messages
- **Validation errors**: Real-time form validation
- **Timeout handling**: Automatic retry mechanism

## 🔄 Search Flow

1. **User selects places** from autocomplete dropdown
2. **Form validation** ensures all required fields
3. **API call** creates search session
4. **Polling** waits for results (up to 60 seconds)
5. **Results displayed** in flight results screen
6. **Recent search** added to history

## 📈 Performance Optimizations

- **Debounced search**: Reduces API calls
- **Caching**: 5-minute cache for places
- **Mock fallback**: Instant response when API unavailable
- **Loading states**: Clear user feedback

## 🔐 Security

- **API key**: Stored in environment variables
- **Request headers**: Proper authentication
- **Error messages**: No sensitive data exposed

## 🎯 Next Steps

1. **Get your API key** from RapidAPI
2. **Add to environment variables**
3. **Test the integration**
4. **Customize search parameters** if needed
5. **Monitor API usage** in RapidAPI dashboard

## 📞 Support

If you encounter any issues:

1. **Check API key**: Ensure it's correctly set in environment
2. **Verify subscription**: Make sure you have active RapidAPI subscription
3. **Check network**: Ensure internet connectivity
4. **Review logs**: Check console for error messages

The app will automatically fall back to mock data if there are any API issues, ensuring a smooth user experience regardless of API availability.

---

**Happy flying! ✈️**
