import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

import { mixins } from "@/styles";
import { LOGO } from "@/constants/images";

import Input from "@/components/inputs/Input";
import { H2, P } from "@/components/typography";
import Container from "@/components/misc/Container";
import Checkbox from "@/components/inputs/Checkbox";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";

const LoginScreen = () => {
  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate("Tab" as never);
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
              <H2 style={styles.formTitle}>Welcome back </H2>
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
            <View style={styles.checkboxContainer}>
              <Checkbox checked={false} onValueChange={() => {}} />
              <P style={styles.checkboxText}>
                I agree to the terms and privacy policy
              </P>
            </View>
          </View>
        </View>
        <View>
          <PrimaryButton style={styles.loginButton} onPress={onSubmit}>
            Sign in
          </PrimaryButton>
          <View style={styles.signupContainer}>
            <P style={styles.signupText}>Don't have an account? </P>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount" as never)}
            >
              <P style={styles.signupLink}>Sign up</P>
            </TouchableOpacity>
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
  inputContainer: mixins.screenInputContainer,
  checkboxContainer: mixins.checkboxContainer,
  checkboxText: mixins.checkboxText,
  loginButton: mixins.primaryButton,
  signupContainer: mixins.signupContainer,
  signupText: mixins.signupText,
  signupLink: mixins.signupLink,
});

export default LoginScreen;
