import { View, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { colors, mixins } from "@/styles";

import HomeHeader from "@/components/homescreen/HomeHeader";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";
import Container from "@/components/misc/Container";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={[
        colors.primaryLight + "90",
        colors.white,
        colors.white,
        colors.white,
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={mixins.expand}
    >
      <ScreenWrapper>
        <Container style={styles.container}>
          <HomeHeader />
        </Container>
      </ScreenWrapper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default HomeScreen;
