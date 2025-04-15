import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import he from "he";

interface IProps {
  item: DeezerTrack;
}

export const SearchItem = ({ item }: IProps) => {
  const decodedTitle = he.decode(item.title);

  const handlePress = () => {};

  return (
    <TouchableOpacity style={styles.videoItem} onPress={handlePress}>
      <Image
        source={{ uri: item.album.cover_medium }}
        style={styles.thumbnail}
      />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {decodedTitle}
        </Text>
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
  channelName: {
    color: COLORS.dark.placeholder,
    fontSize: 12,
    marginTop: 4,
  },
});
