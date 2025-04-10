import React from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { VideoItem } from "../atoms/VideoItem";
import { YouTubeSearchResult } from "@/lib/services/youtube";

interface IProps {
  videos: YouTubeSearchResult[];
}

export const VideoList = ({ videos }: IProps) => {
  const renderVideoItem = ({
    item,
  }: ListRenderItemInfo<YouTubeSearchResult>) => <VideoItem item={item} />;

  return (
    <FlatList
      data={videos}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id.videoId}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
