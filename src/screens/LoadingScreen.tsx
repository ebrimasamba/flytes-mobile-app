import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@/styles";
import { LOGO } from "@/constants/images";
import { H2 } from "@/components/typography";

const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary, colors.primary + "80"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logo} contentFit="contain" />
        </View>
        <H2 style={styles.appName}>Flytes</H2>
        <View style={styles.loadingDots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  appName: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 48,
    letterSpacing: 1,
  },
  loadingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
  dot1: {
    animationDelay: "0ms",
  },
  dot2: {
    animationDelay: "200ms",
  },
  dot3: {
    animationDelay: "400ms",
  },
});

export default LoadingScreen;
