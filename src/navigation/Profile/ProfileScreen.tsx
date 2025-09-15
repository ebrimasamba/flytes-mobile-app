import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "@/styles";
import { useAuthStore } from "@/store/authStore";

import { H1, P } from "@/components/typography";
import ScreenWrapper from "@/components/wrappers/ScreenWrapper";
import Container from "@/components/misc/Container";
import ScreenHeader from "@/components/layouts/ScreenHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Profile" />
      <Container style={styles.container}>
        <View style={styles.content}>
          <View style={styles.profileSection}>
            <H1 style={styles.title}>Welcome, {user?.name || "User"}!</H1>
            <P style={styles.email}>{user?.email}</P>
          </View>

          <View style={styles.actionsSection}>
            <PrimaryButton
              style={styles.logoutButton}
              onPress={handleLogout}
              variant="secondary"
            >
              Sign Out
            </PrimaryButton>
          </View>
        </View>
      </Container>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
  },
  actionsSection: {
    paddingBottom: 40,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
