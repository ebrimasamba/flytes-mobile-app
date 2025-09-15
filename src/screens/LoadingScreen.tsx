import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@/styles";
import { LOGO } from "@/constants/images";
import { H2, P } from "@/components/typography";

const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial entrance animation
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

    // Continuous rotation animation for logo
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    // Animated dots
    const dotAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim1, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim1, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(1200),
      ])
    );

    const dotAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(dotAnim2, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim2, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ])
    );

    const dotAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(dotAnim3, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim3, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(800),
      ])
    );

    rotateAnimation.start();
    pulseAnimation.start();
    dotAnimation1.start();
    dotAnimation2.start();
    dotAnimation3.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
      dotAnimation1.stop();
      dotAnimation2.stop();
      dotAnimation3.stop();
    };
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
            transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.rotatingRing,
              {
                transform: [{ rotate: rotation }],
              },
            ]}
          >
            <View style={styles.ring} />
          </Animated.View>
          <Image source={LOGO} style={styles.logo} contentFit="contain" />
        </View>
        <H2 style={styles.appName}>Flytes</H2>
        <P style={styles.loadingText}>Loading your experience...</P>
        <View style={styles.loadingDots}>
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dotAnim1,
                transform: [{ scale: dotAnim1 }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dotAnim2,
                transform: [{ scale: dotAnim2 }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dotAnim3,
                transform: [{ scale: dotAnim3 }],
              },
            ]}
          />
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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  rotatingRing: {
    position: "absolute",
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: colors.white + "40",
    borderRightColor: colors.white + "20",
  },
  logo: {
    width: 80,
    height: 80,
    zIndex: 1,
  },
  appName: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 1,
  },
  loadingText: {
    color: colors.white + "CC",
    fontSize: 14,
    marginBottom: 32,
    textAlign: "center",
  },
  loadingDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
});

export default LoadingScreen;
