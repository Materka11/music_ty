import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { COLORS } from "@/constants/colors";

interface IProps {
  query: string;
  onQueryChange: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
  handleCancel?: () => void;
}

export const SearchBar = ({
  query,
  onQueryChange,
  onFocus,
  onBlur,
  style,
  handleCancel,
}: IProps) => {
  const onCancelPress = () => {
    Keyboard.dismiss();
    handleCancel?.();
  };

  return (
    <View style={[styles.searchContainer, style]}>
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={onCancelPress} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
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
  cancelButton: {
    marginHorizontal: 16,
  },
  cancelButtonText: {
    color: "#ff0000",
    fontSize: 16,
  },
});
