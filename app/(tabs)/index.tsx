import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SearchBar } from "@/components/atoms/SearchBar";
import { SearchList } from "@/components/molecules/SearchList";
import { debounce } from "@/lib/hellpers/debounce";
import { getDeezerSearchResults } from "@/lib/services/deezer";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DeezerSearchResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const headerOpacity = useState(new Animated.Value(1))[0];
  const searchBarTranslateY = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: isSearchFocused ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(searchBarTranslateY, {
        toValue: isSearchFocused ? -40 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSearchFocused, headerOpacity, searchBarTranslateY]);

  const fetchVideos = async (
    searchQuery: string,
    isLoadMore: boolean = false
  ): Promise<void> => {
    if (searchQuery.trim() === "") {
      setSearchResults(null);
      setError(null);
      return;
    }

    setLoading(true);

    setError(null);

    try {
      const data = await getDeezerSearchResults({ q: searchQuery });
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      setError("Failed to fetch videos. Please try again.");
      if (!isLoadMore) {
        setSearchResults(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchVideos = useCallback(debounce(fetchVideos, 500), []);

  useEffect(() => {
    debouncedFetchVideos(query);
  }, [query, debouncedFetchVideos]);

  const handleCancel = () => {
    setQuery("");
    setSearchResults(null);
    setError(null);
    setIsSearchFocused(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: headerOpacity }}>
        <Text style={styles.header}>Search</Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: searchBarTranslateY }],
        }}
      >
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            if (query.trim() === "") {
              setIsSearchFocused(false);
            }
          }}
          style={isSearchFocused ? styles.searchBarFocused : styles.searchBar}
          handleCancel={handleCancel}
        />
      </Animated.View>

      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}

      <SearchList searchResults={searchResults?.data || []} />

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
  loadMoreIndicator: {
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
  searchBar: {
    marginVertical: 16,
  },
  searchBarFocused: {
    marginVertical: 0,
    marginTop: 8,
  },
});
