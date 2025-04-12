import { COLORS } from "@/constants/colors";
import { YouTubeSearchResult } from "@/lib/services/youtube";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import he from "he";

interface IProps {
  item: YouTubeSearchResult;
}

export const VideoItem = ({ item }: IProps) => {
  const decodedTitle = he.decode(item.snippet.title);
  const decodedChannelTitle = he.decode(item.snippet.channelTitle);

  return (
    <TouchableOpacity style={styles.videoItem}>
      <Image
        source={{ uri: item.snippet.thumbnails.medium.url }}
        style={styles.thumbnail}
      />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {decodedTitle}
        </Text>
        <Text style={styles.channelName} numberOfLines={1}>
          {decodedChannelTitle}
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
