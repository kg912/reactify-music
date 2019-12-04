import { TokenInfo } from 'types';

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: 1;
  duration_ms: 229826;
  explicit: true;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface TrackAPIResponse {
  items: { track: Track }[];
}

export interface APIData {
  data?: Object;
  status: number;
}

export interface SpotifyServiceType extends TokenInfo {
  accessToken: string;
  expiresIn: string;
  tokenType: string;
  authenticate(): void;
  getTokenFromStorage(): TokenInfo | object;
  setToken(tokenInfo: TokenInfo): void;
  clearToken(): void;
  signup(): void;
}
