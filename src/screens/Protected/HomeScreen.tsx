import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { colors, mixins } from "@/styles";
import Container from "@/components/misc/Container";
import HomeHeader from "@/components/homescreen/HomeHeader";
import PopularDestinations from "@/components/popular-destinations/PopularDestinations";

const HomeScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.white }}
      contentContainerStyle={mixins.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <Container style={styles.container}>
        <View style={styles.contentContainer}>
          <PopularDestinations />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
export default HomeScreen;
