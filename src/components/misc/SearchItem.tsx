import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/styles";
import { H3, P } from "../typography";
import { SimpleLineIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import IconComponent from "./IconComponent";

type SearchItemProps = {
  name: string;
  type: string;
  country: string;
  airportCode?: string;
  distance?: string;
  isPopular?: boolean;
  isRecent?: boolean;
  onPress?: () => void;
};

const SearchItem = (props: SearchItemProps) => {
  return (
    <TouchableOpacity
      style={styles.searchItemContainer}
      onPress={props.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <IconComponent
          color={colors.primary}
          type={props.type as any}
          style={styles.iconContainer}
          size={24}
        />
        <View style={styles.textContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText} numberOfLines={1}>
              {props.name}
            </Text>
            {props.airportCode && (
              <View style={styles.airportCodeBadge}>
                <Text style={styles.airportCodeText}>{props.airportCode}</Text>
              </View>
            )}
          </View>
          <View style={styles.detailRow}>
            <View style={styles.typeContainer}>
              <View style={styles.typeDot} />
              <Text style={styles.typeText}>{props.type}</Text>
            </View>
            <Text style={styles.countryText}>{props.country}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        {props.isPopular && (
          <View style={styles.popularBadge}>
            <MaterialIcons
              name="trending-up"
              size={12}
              color={colors.warning}
            />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}

        {props.isRecent && (
          <View style={styles.recentBadge}>
            <MaterialIcons
              name="access-time"
              size={12}
              color={colors.textLight}
            />
            <Text style={styles.recentText}>Recent</Text>
          </View>
        )}

        {props.distance && (
          <Text style={styles.distanceText}>{props.distance}</Text>
        )}

        <View style={styles.chevronContainer}>
          <MaterialIcons
            name="chevron-right"
            size={16}
            color={colors.textLight}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchItemContainer: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: 8,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: -0.2,
    flex: 1,
  },
  airportCodeBadge: {
    backgroundColor: colors.primary + "15",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  airportCodeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.success,
  },
  typeText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textLight,
  },
  countryText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: "400",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
    minWidth: 60,
  },
  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.warning + "15",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.warning,
    letterSpacing: 0.2,
  },
  recentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.gray + "15",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  recentText: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.textLight,
  },
  distanceText: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: "500",
  },
  chevronContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray + "10",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchItem;
