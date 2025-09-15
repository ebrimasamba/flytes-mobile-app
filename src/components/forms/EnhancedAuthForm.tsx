import React from "react";
import { View, StyleSheet, Alert, Animated } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { useAuthStore } from "@/store/authStore";
import {
  loginSchema,
  registerSchema,
  LoginFormData,
  RegisterFormData,
} from "@/schemas/validation";

import { P } from "@/components/typography";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import LoadingSpinner from "@/components/misc/LoadingSpinner";
import FormikInput from "./FormikInput";
import FormikCheckbox from "./FormikCheckbox";

interface EnhancedAuthFormProps {
  mode: "login" | "register";
  onSubmit: () => void;
  onSwitchMode: () => void;
}

const EnhancedAuthForm: React.FC<EnhancedAuthFormProps> = ({
  mode,
  onSubmit,
  onSwitchMode,
}) => {
  const { login, register, isLoading, error, clearError } = useAuthStore();
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    // Animate form entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [mode]);

  const isLogin = mode === "login";

  const handleSubmit = async (values: LoginFormData | RegisterFormData) => {
    // Validate terms agreement
    if (!agreedToTerms) {
      Alert.alert("Error", "Please agree to the terms and privacy policy");
      return;
    }

    try {
      if (isLogin) {
        await login(values as LoginFormData);
      } else {
        await register(values as RegisterFormData);
      }

      onSubmit();
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const initialValues = isLogin
    ? { email: "", password: "" }
    : { name: "", email: "", password: "", confirmPassword: "" };

  const validationSchema = isLogin ? loginSchema : registerSchema;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, dirty }) => (
          <>
            <View style={styles.formContainer}>
              {!isLogin && (
                <FormikInput
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  containerStyle={styles.inputContainer}
                />
              )}

              <FormikInput
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
              />

              <FormikInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                containerStyle={styles.inputContainer}
              />

              {!isLogin && (
                <FormikInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  secureTextEntry
                  containerStyle={styles.inputContainer}
                />
              )}

              <View style={styles.checkboxContainer}>
                <FormikCheckbox
                  name="agreedToTerms"
                  checked={agreedToTerms}
                  onValueChange={setAgreedToTerms}
                />
                <P style={styles.checkboxText}>
                  I agree to the terms and privacy policy
                </P>
              </View>

              {error && (
                <View style={styles.errorContainer}>
                  <P style={styles.errorText}>{error}</P>
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton
                style={styles.submitButton}
                onPress={() => handleSubmit(values)}
                loading={isLoading}
                disabled={isLoading || !isValid || !dirty}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <LoadingSpinner size="small" color="white" />
                    <P style={styles.loadingText}>Please wait...</P>
                  </View>
                ) : isLogin ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </PrimaryButton>

              <View style={styles.switchContainer}>
                <P style={styles.switchText}>
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </P>
                <PrimaryButton
                  variant="text"
                  onPress={onSwitchMode}
                  style={styles.switchButton}
                >
                  {isLogin ? "Sign up" : "Login"}
                </PrimaryButton>
              </View>
            </View>
          </>
        )}
      </Formik>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    backgroundColor: "#fee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 14,
  },
  buttonContainer: {
    gap: 16,
  },
  submitButton: {
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    color: "#666",
    fontSize: 14,
  },
  switchButton: {
    marginLeft: 4,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EnhancedAuthForm;
