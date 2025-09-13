import React from "react";
import { View, StyleSheet } from "react-native";

import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

import { LOGO } from "@/constants/images";

import Input from "@/components/inputs/Input";
import { H1, H2, H3, P } from "@/components/typography";
import Container from "@/components/misc/Container";
import SocialButton from "@/components/buttons/SocialButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";

const LoginScreen = () => {
  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <Container style={styles.container}>
        <View>
          <View style={styles.logoContainer}>
            <Image source={LOGO} contentFit="contain" style={styles.logo} />
            <H2 style={styles.logoText}>Flytes</H2>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formTitleContainer}>
              <H2 style={styles.formTitle}>Sign in </H2>
              <P style={styles.formDescription}>
                Enter your email and password to login
              </P>
            </View>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              containerStyle={styles.inputContainer}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              containerStyle={styles.inputContainer}
            />
          </View>
        </View>
        <PrimaryButton style={styles.loginButton}>Sign in</PrimaryButton>
      </Container>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 35,
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontSize: 24,
    textAlign: "center",
  },

  formContainer: {
    // gap: 20,
  },
  formTitleContainer: {
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  formDescription: {
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 30,
  },
  socialContainer: {
    marginTop: 35,
    gap: 15,
  },
  socialTitle: {
    textAlign: "center",
  },
  loginButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
