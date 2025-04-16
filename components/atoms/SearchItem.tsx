import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import he from "he";

interface IProps {
  item: DeezerSearchResultItem;
}

export const SearchItem = ({ item }: IProps) => {
  const getTitle = () => {
    if (item.type === "track") return he.decode(item.title);
    if (item.type === "artist") return he.decode(item.name);
    if (item.type === "album") return he.decode(item.title);
    return "";
  };

  const getImage = () => {
    if (item.type === "track") return item.album.cover_medium;
    if (item.type === "artist") return item.picture_medium;
    if (item.type === "album") return item.cover_medium;
    return "";
  };

  const handlePress = () => {};

  return (
    <TouchableOpacity style={styles.videoItem} onPress={handlePress}>
      <Image source={{ uri: getImage() }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {getTitle()}
        </Text>
        <Text>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#222",
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: 120,
    height: 90,
  },
  videoInfo: {
    flex: 1,
    padding: 8,
  },
  videoTitle: {
    color: COLORS.dark.text,
    fontSize: 15,
    fontWeight: "400",
  },
});
