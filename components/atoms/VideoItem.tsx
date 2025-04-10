import { COLORS } from "@/constants/colors";
import { YouTubeSearchResult } from "@/lib/services/youtube";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

interface IProps {
  item: YouTubeSearchResult;
}

export const VideoItem = ({ item }: IProps) => {
  return (
    <TouchableOpacity style={styles.videoItem}>
      <Image
        source={{ uri: item.snippet.thumbnails.medium.url }}
        style={styles.thumbnail}
      />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.snippet.title}
        </Text>
        <Text style={styles.channelName} numberOfLines={1}>
          {item.snippet.channelTitle}
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
    fontSize: 16,
    fontWeight: "600",
  },
  channelName: {
    color: COLORS.dark.placeholder,
    fontSize: 14,
    marginTop: 4,
  },
});
