import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <EvilIcons
            name="search"
            size={24}
            color={COLORS.dark.placeholder}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Artists, Songs, Lyrics, and More"
            placeholderTextColor={COLORS.dark.placeholder}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.dark.text,
    marginTop: 16,
    marginHorizontal: 16,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 25,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    color: COLORS.dark.text,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
