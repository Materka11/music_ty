import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Audio } from "expo-av";
import * as ytdl from "react-native-ytdl";

export default function VideoPlayerScreen() {
  const { videoId, thumbnailUrl, title, channelTitle } = useLocalSearchParams<{
    videoId: string;
    thumbnailUrl: string;
    title: string;
    channelTitle: string;
  }>();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const streams = await ytdl.getInfo(youtubeUrl);
        const audioFormats = ytdl.filterFormats(streams.formats, "audioonly");
        if (!audioFormats.length) {
          throw new Error("No audio stream found for this video.");
        }
        const audioUrl = audioFormats[0].url;

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(sound);
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } catch (err) {
        setError("Failed to load audio. Please try again.");
        console.error("Error loading audio:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      sound?.unloadAsync();
    };
  }, [videoId]);

  const togglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.channelTitle} numberOfLines={1}>
              {channelTitle}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}
            accessibilityLabel={isPlaying ? "Pause audio" : "Play audio"}
            accessibilityRole="button"
          >
            <Text style={styles.playPauseText}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        accessibilityLabel="Go back to search"
        accessibilityRole="button"
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    alignItems: "center",
  },
  thumbnail: {
    width: "90%",
    height: 200,
    borderRadius: 8,
  },
  videoInfo: {
    paddingHorizontal: 16,
    marginVertical: 16,
    width: "100%",
  },
  videoTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  channelTitle: {
    color: "#888",
    fontSize: 14,
    marginTop: 4,
  },
  playPauseButton: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#555",
    borderRadius: 8,
  },
  playPauseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loader: {
    marginVertical: 16,
  },
  error: {
    color: "#f00",
    textAlign: "center",
    marginVertical: 16,
  },
});
