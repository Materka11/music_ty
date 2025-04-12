import React from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { VideoItem } from "../atoms/VideoItem";
import { YouTubeSearchResult } from "@/lib/services/youtube";

interface IProps {
  videos: YouTubeSearchResult[];
  onEndReached?: () => void;
}

export const VideoList = ({ videos, onEndReached }: IProps) => {
  const renderVideoItem = ({
    item,
  }: ListRenderItemInfo<YouTubeSearchResult>) => <VideoItem item={item} />;

  return (
    <FlatList
      data={videos}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id.videoId}
      contentContainerStyle={styles.listContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
