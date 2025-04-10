interface YouTubeSearchListResponse {
  error: any;
  kind: "youtube#searchListResponse";
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
}

export interface YouTubeSearchResult {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: "youtube#video";
    videoId: string;
  };
  snippet: YouTubeSnippet;
}

interface YouTubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: "none" | "live" | "upcoming";
  publishTime: string;
}

interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YT_API_KEY;

export const getYoutubeSearchResults = async (
  searchQuery: string,
  pageToken?: string
): Promise<YouTubeSearchListResponse> => {
  try {
    const musicQuery = `${searchQuery} music`;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      musicQuery
    )}&type=video&videoCategoryId=10&topicId=/m/04rlf&maxResults=10&key=${YOUTUBE_API_KEY}${
      pageToken ? `&pageToken=${pageToken}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: YouTubeSearchListResponse = await response.json();

    if (data.error) {
      throw new Error(`YouTube API error: ${data.error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching YouTube search results:", error);
    throw error;
  }
};
