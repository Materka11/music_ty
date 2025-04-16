type DeezerSearchResultType = "track" | "album" | "artist";

interface GetDeezerSearchResultsParams {
  q: string;
  type?: DeezerSearchResultType;
}

interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  ng_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: "artist";
}

interface DeezerAlbum {
  id: number;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  genres: DeezerGenre[];
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: string;
  record_type: string;
  available: boolean;
  alternative: DeezerAlternative[];
  tracklist: string;
  explict_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: DeezerArtist[];
  fallback: DeezerAlbum[];
  artist: DeezerArtist;
  tracks: DeezerTrack[];
  type: "album";
}

interface DeezerGenre {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: "genre";
}

interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: DeezerArtist;
  album: DeezerAlbum;
  type: "track";
}

type DeezerSearchResultItem = DeezerTrack | DeezerArtist | DeezerAlbum;

interface DeezerSearchResult {
  data: DeezerSearchResultItem[];
  total: number;
  next?: string;
}
