import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/styles";
import { H1, P } from "@/components/typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: "light" | "dark" | "auto";
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  rightComponent,
  backgroundColor = colors.white,
  statusBarStyle = "dark",
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <View style={[styles.header, { backgroundColor }]}>
          <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons
                  name="arrow-back-ios"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.centerSection}>
            {title && <H1 style={styles.title}>{title}</H1>}
            {subtitle && <P style={styles.subtitle}>{subtitle}</P>}
          </View>

          <View style={styles.rightSection}>{rightComponent}</View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    zIndex: 1000,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray + "20",
    minHeight: 56,
  },
  leftSection: {
    width: 40,
    alignItems: "flex-start",
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: colors.gray + "20",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginTop: 2,
  },
  rightSection: {
    width: 40,
    alignItems: "flex-end",
  },
});

export default ScreenHeader;
