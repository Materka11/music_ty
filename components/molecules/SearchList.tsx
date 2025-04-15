import React from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { SearchItem } from "../atoms/SearchItem";

interface IProps {
  searchResults: DeezerTrack[];
  onEndReached?: () => void;
}

export const SearchList = ({ searchResults, onEndReached }: IProps) => {
  const renderVideoItem = ({ item }: ListRenderItemInfo<DeezerTrack>) => (
    <SearchItem item={item} />
  );

  return (
    <FlatList
      data={searchResults}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id?.toString()}
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
