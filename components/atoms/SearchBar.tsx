import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { COLORS } from "@/constants/colors";

interface IProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const SearchBar = ({ query, onQueryChange }: IProps) => {
  return (
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
          value={query}
          onChangeText={onQueryChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
