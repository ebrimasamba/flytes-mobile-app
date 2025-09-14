import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/authStore";
import {
  validateLoginForm,
  validateRegisterForm,
  sanitizeCredentials,
} from "@/utils";
import { LoginCredentials, RegisterCredentials } from "@/types/user";

import Input from "@/components/inputs/Input";
import { P } from "@/components/typography";
import Checkbox from "@/components/inputs/Checkbox";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { colors } from "@/styles";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: () => void;
  onSwitchMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onSwitchMode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register, isLoading, error, clearError } = useAuthStore();

  const isLogin = mode === "login";

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Clear auth error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async () => {
    // Validate terms agreement
    if (!agreedToTerms) {
      Alert.alert("Error", "Please agree to the terms and privacy policy");
      return;
    }

    // Validate form data
    const validationError = isLogin
      ? validateLoginForm(formData as LoginCredentials)
      : validateRegisterForm(formData as RegisterCredentials);

    if (validationError) {
      Alert.alert("Validation Error", validationError);
      return;
    }

    // Sanitize and submit
    const sanitizedData = sanitizeCredentials(
      formData as LoginCredentials | RegisterCredentials
    );

    try {
      if (isLogin) {
        await login(sanitizedData as LoginCredentials);
      } else {
        await register(sanitizedData as RegisterCredentials);
      }

      onSubmit();
    } catch (err) {
      // Error is handled by the store
      console.error("Auth error:", err);
    }
  };

  const handleSwitchMode = () => {
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
    clearError();
    onSwitchMode();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {!isLogin && (
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            containerStyle={styles.inputContainer}
            error={errors.name}
          />
        )}

        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
          secureTextEntry
          containerStyle={styles.inputContainer}
          error={errors.password}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox checked={agreedToTerms} onValueChange={setAgreedToTerms} />
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
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading
            ? "Please wait..."
            : isLogin
            ? "Sign in"
            : "Create account"}
        </PrimaryButton>

        <View style={styles.switchContainer}>
          <P style={styles.switchText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </P>
          <TouchableOpacity
            onPress={handleSwitchMode}
            style={styles.switchButton}
          >
            <P style={styles.switchButtonText}>
              {isLogin ? "Sign up" : "Login"}
            </P>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  },
  switchButton: {
    marginLeft: 0,
  },
  switchButtonText: {
    color: colors.primary,
  },
});

export default AuthForm;
