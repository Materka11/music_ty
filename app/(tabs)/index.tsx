import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "@/components/atoms/SearchBar";
import { VideoList } from "@/components/molecules/VideoList";
import { debounce } from "@/lib/hellpers/debounce";
import {
  getYoutubeSearchResults,
  YouTubeSearchResult,
} from "@/lib/services/youtube";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (searchQuery: string): Promise<void> => {
    if (searchQuery.trim() === "") {
      setVideos([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getYoutubeSearchResults(searchQuery);
      setVideos(data.items);
    } catch (error) {
      setError("Failed to fetch videos. Please try again.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchVideos = useCallback(debounce(fetchVideos, 500), []);

  useEffect(() => {
    debouncedFetchVideos(query);
  }, [query, debouncedFetchVideos]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <SearchBar query={query} onQueryChange={setQuery} />
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
      <VideoList videos={videos} />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity onPress={() => debouncedFetchVideos(query)}>
            <Text style={styles.retryButton}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginHorizontal: 16,
  },
  loader: {
    marginVertical: 16,
  },
  error: {
    color: "#f00",
    textAlign: "center",
    marginVertical: 16,
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  retryButton: {
    color: "#fff",
    backgroundColor: "#555",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
