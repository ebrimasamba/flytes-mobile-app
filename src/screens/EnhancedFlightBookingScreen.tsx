import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dayjs from "dayjs";

import { colors } from "@/styles";
import { useFlightStore } from "@/store/flightStore";
import { useAuthStore } from "@/store/authStore";
import { bookingSchema, BookingFormData } from "@/schemas/validation";
import { formatCurrency, formatDate } from "@/utils";

import { H1, H2, H3, P } from "@/components/typography";
import Container from "@/components/misc/Container";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";
import Card from "@/components/layouts/Card";
import ScreenHeader from "@/components/layouts/ScreenHeader";
import LoadingSpinner from "@/components/misc/LoadingSpinner";
import FormikInput from "@/components/forms/FormikInput";
import FormikDatePicker from "@/components/forms/FormikDatePicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const EnhancedFlightBookingScreen = () => {
  const navigation = useNavigation();
  const { selectedFlight, createBooking, isBooking, bookingError } =
    useFlightStore();
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  React.useEffect(() => {
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

  if (!selectedFlight) {
    return (
      <ScreenWrapper>
        <Container style={styles.container}>
          <H1>No flight selected</H1>
        </Container>
      </ScreenWrapper>
    );
  }

  const initialValues: BookingFormData = {
    passengers: {
      adults: [
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "male" as const,
        },
      ],
      children: [],
      infants: [],
    },
    contact: {
      email: user?.email || "",
      phone: "",
    },
    payment: {
      method: "card" as const,
    },
  };

  const handleBooking = async (values: BookingFormData) => {
    try {
      await createBooking();
      Alert.alert(
        "Booking Confirmed!",
        "Your flight has been successfully booked. You will receive a confirmation email shortly.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Tab" as never),
          },
        ]
      );
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  const handleNextStep = (values: BookingFormData, errors: any) => {
    if (currentStep === 1) {
      // Validate passenger details
      if (values.passengers.adults.length === 0) {
        Alert.alert("Error", "Please add at least one adult passenger");
        return;
      }
      const hasEmptyFields = values.passengers.adults.some(
        (passenger) =>
          !passenger.firstName || !passenger.lastName || !passenger.dateOfBirth
      );
      if (hasEmptyFields) {
        Alert.alert("Error", "Please fill in all passenger details");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate contact details
      if (!values.contact.email || !values.contact.phone) {
        Alert.alert("Error", "Please fill in all contact details");
        return;
      }
      setCurrentStep(3);
    }
  };

  const renderPassengerForm = (
    index: number,
    values: BookingFormData,
    setFieldValue: any
  ) => (
    <Card key={index} style={styles.passengerCard}>
      <H3 style={styles.passengerTitle}>Passenger {index + 1}</H3>
      <View style={styles.inputRow}>
        <FormikInput
          name={`passengers.adults.${index}.firstName`}
          label="First Name"
          placeholder="Enter first name"
          containerStyle={styles.halfInput}
        />
        <FormikInput
          name={`passengers.adults.${index}.lastName`}
          label="Last Name"
          placeholder="Enter last name"
          containerStyle={styles.halfInput}
        />
      </View>
      <View style={styles.dateOfBirthContainer}>
        <FormikDatePicker
          name={`passengers.adults.${index}.dateOfBirth`}
          label="Date of Birth"
          placeholder="Select date of birth"
          maximumDate={new Date()}
        />
      </View>
      <View style={styles.genderSection}>
        <P style={styles.inputLabel}>Gender</P>
        <View style={styles.genderContainer}>
          {(["male", "female", "other"] as const).map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderButton,
                values.passengers.adults[index]?.gender === gender &&
                  styles.genderButtonActive,
              ]}
              onPress={() =>
                setFieldValue(`passengers.adults.${index}.gender`, gender)
              }
            >
              <P
                style={[
                  styles.genderButtonText,
                  values.passengers.adults[index]?.gender === gender &&
                    styles.genderButtonTextActive,
                ]}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </P>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              currentStep >= step && styles.stepCircleActive,
            ]}
          >
            <P
              style={[
                styles.stepNumber,
                currentStep >= step && styles.stepNumberActive,
              ]}
            >
              {step}
            </P>
          </View>
          <P
            style={[
              styles.stepLabel,
              currentStep >= step && styles.stepLabelActive,
            ]}
          >
            {step === 1 ? "Passengers" : step === 2 ? "Contact" : "Payment"}
          </P>
        </View>
      ))}
    </View>
  );

  const renderStepContent = (
    values: BookingFormData,
    setFieldValue: any,
    errors: any
  ) => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <H2 style={styles.stepTitle}>Passenger Information</H2>
            <P style={styles.stepDescription}>
              Please provide the details for all passengers
            </P>
            {values.passengers.adults.map((_, index) =>
              renderPassengerForm(index, values, setFieldValue)
            )}
          </View>
        );
      case 2:
        return (
          <View>
            <H2 style={styles.stepTitle}>Contact Information</H2>
            <P style={styles.stepDescription}>
              We'll use this information to send you booking confirmations
            </P>
            <Card style={styles.contactCard}>
              <FormikInput
                name="contact.email"
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FormikInput
                name="contact.phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </Card>
          </View>
        );
      case 3:
        return (
          <View>
            <H2 style={styles.stepTitle}>Payment Information</H2>
            <P style={styles.stepDescription}>
              Choose your preferred payment method
            </P>
            <Card style={styles.paymentCard}>
              <View style={styles.paymentMethods}>
                {[
                  {
                    method: "card",
                    label: "Credit/Debit Card",
                    icon: "credit-card",
                  },
                  { method: "paypal", label: "PayPal", icon: "paypal" },
                  {
                    method: "bank_transfer",
                    label: "Bank Transfer",
                    icon: "account-balance",
                  },
                ].map(({ method, label, icon }) => (
                  <TouchableOpacity
                    key={method}
                    style={[
                      styles.paymentMethod,
                      values.payment.method === method &&
                        styles.paymentMethodActive,
                    ]}
                    onPress={() => setFieldValue("payment.method", method)}
                  >
                    <MaterialIcons
                      name={icon as any}
                      size={24}
                      color={
                        values.payment.method === method
                          ? colors.primary
                          : colors.textLight
                      }
                    />
                    <P
                      style={[
                        styles.paymentMethodText,
                        values.payment.method === method &&
                          styles.paymentMethodTextActive,
                      ]}
                    >
                      {label}
                    </P>
                  </TouchableOpacity>
                ))}
              </View>

              {values.payment.method === "card" && (
                <View style={styles.cardDetails}>
                  <FormikInput
                    name="payment.cardNumber"
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                  />
                  <View style={styles.inputRow}>
                    <FormikInput
                      name="payment.expiryDate"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      containerStyle={styles.halfInput}
                    />
                    <FormikInput
                      name="payment.cvv"
                      label="CVV"
                      placeholder="123"
                      containerStyle={styles.halfInput}
                      secureTextEntry
                    />
                  </View>
                  <FormikInput
                    name="payment.cardholderName"
                    label="Cardholder Name"
                    placeholder="Enter cardholder name"
                  />
                </View>
              )}
            </Card>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Book Flight" subtitle="Complete your booking" />
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Flight Summary */}
            <Card style={styles.flightSummary}>
              <View style={styles.flightHeader}>
                <View style={styles.flightRoute}>
                  <P style={styles.routeText}>
                    {selectedFlight.segments[0].departure.airport.code} →{" "}
                    {
                      selectedFlight.segments[
                        selectedFlight.segments.length - 1
                      ].arrival.airport.code
                    }
                  </P>
                  <P style={styles.flightDate}>
                    {formatDate(selectedFlight.segments[0].departure.time)}
                  </P>
                </View>
                <View style={styles.flightPrice}>
                  <P style={styles.price}>
                    {formatCurrency(
                      selectedFlight.price.total,
                      selectedFlight.price.currency
                    )}
                  </P>
                  <P style={styles.priceLabel}>per person</P>
                </View>
              </View>
            </Card>

            {/* Step Indicator */}
            {renderStepIndicator()}

            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(bookingSchema)}
              onSubmit={handleBooking}
            >
              {({ values, setFieldValue, errors, isValid, dirty }) => (
                <>
                  {/* Step Content */}
                  {renderStepContent(values, setFieldValue, errors)}

                  {/* Error Display */}
                  {bookingError && (
                    <Card style={styles.errorCard}>
                      <P style={styles.errorText}>{bookingError}</P>
                    </Card>
                  )}

                  {/* Navigation Buttons */}
                  <View style={styles.navigationButtons}>
                    {currentStep > 1 && (
                      <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setCurrentStep(currentStep - 1)}
                      >
                        <P style={styles.backButtonText}>Back</P>
                      </TouchableOpacity>
                    )}
                    {currentStep < 3 ? (
                      <PrimaryButton
                        style={styles.nextButton}
                        onPress={() => handleNextStep(values, errors)}
                      >
                        Next
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        style={styles.confirmButton}
                        onPress={() => handleBooking(values)}
                        loading={isBooking}
                        disabled={isBooking || !isValid || !dirty}
                      >
                        {isBooking ? (
                          <View style={styles.loadingContainer}>
                            <LoadingSpinner size="small" color={colors.white} />
                            <P style={styles.loadingText}>Processing...</P>
                          </View>
                        ) : (
                          "Confirm Booking"
                        )}
                      </PrimaryButton>
                    )}
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
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
  flightSummary: {
    marginBottom: 24,
  },
  flightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flightRoute: {
    flex: 1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  flightDate: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  flightPrice: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
  },
  stepNumberActive: {
    color: colors.white,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 20,
  },
  passengerCard: {
    marginBottom: 16,
  },
  passengerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0,
  },
  dateOfBirthContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textLight,
    marginBottom: 8,
  },
  genderSection: {
    marginBottom: 16,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray + "20",
    borderRadius: 8,
    alignItems: "center",
  },
  genderButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textLight,
  },
  genderButtonTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  contactCard: {
    marginBottom: 16,
  },
  paymentCard: {
    marginBottom: 16,
  },
  paymentMethods: {
    gap: 12,
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray + "20",
    borderRadius: 12,
    gap: 12,
  },
  paymentMethodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textLight,
  },
  paymentMethodTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  cardDetails: {
    gap: 16,
  },
  errorCard: {
    backgroundColor: "#fee",
    borderColor: colors.danger,
    marginBottom: 16,
  },
  errorText: {
    color: colors.danger,
    textAlign: "center",
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  nextButton: {
    flex: 2,
  },
  confirmButton: {
    flex: 2,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EnhancedFlightBookingScreen;
