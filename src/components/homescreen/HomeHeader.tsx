import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { colors } from "@/styles";
import { PROFILE } from "@/constants/images";

import { H2, H3, P } from "@/components/typography";
import SimpleLineIcons from "@expo/vector-icons/build/SimpleLineIcons";

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileContainer}>
        <View>
          <H3 style={styles.greeting}>Hi Ebrima,</H3>
          <H2 style={styles.title}>Traveling today?</H2>
        </View>
        <View>
          <Image source={PROFILE} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <SimpleLineIcons
            name="magnifier"
            size={20}
            color={colors.textLight}
          />
          <P style={styles.searchButtonText}>Start your search</P>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 24,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 0,
  },
  greeting: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.2,
    // fontWeight: "500",
  },
  title: {
    fontSize: 32,
    letterSpacing: -1.2,
    color: colors.text,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 56,
    borderRadius: 16,
    borderCurve: "continuous",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchButtonText: {
    fontSize: 16,
    color: colors.textLight,
    marginLeft: 12,
  },
});

export default HomeHeader;
