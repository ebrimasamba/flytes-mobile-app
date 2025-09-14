import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

import { mixins } from "@/styles";
import { LOGO } from "@/constants/images";

import { H2, P } from "@/components/typography";
import Container from "@/components/misc/Container";
import AuthForm from "@/components/forms/AuthForm";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = () => {
    navigation.navigate("Tab" as never);
  };

  const handleSwitchMode = () => {
    if (isLoginMode) {
      navigation.navigate("CreateAccount" as never);
    } else {
      navigation.navigate("Login" as never);
    }
  };

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
              <H2 style={styles.formTitle}>
                {isLoginMode ? "Welcome back" : "Create an account"}
              </H2>
              <P style={styles.formDescription}>
                {isLoginMode
                  ? "Enter your email and password to login"
                  : "Enter your details to create an account"}
              </P>
            </View>

            <AuthForm
              mode={isLoginMode ? "login" : "register"}
              onSubmit={handleSubmit}
              onSwitchMode={handleSwitchMode}
            />
          </View>
        </View>
      </Container>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: mixins.screenContainer,
  logoContainer: mixins.logoContainer,
  logo: mixins.logo,
  logoText: mixins.logoText,
  formContainer: mixins.formContainer,
  formTitleContainer: mixins.formTitleContainer,
  formTitle: mixins.screenFormTitle,
  formDescription: mixins.screenFormDescription,
});

export default LoginScreen;
