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

export interface Image {
  height: number;
  url: string;
  width: number;
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
  data?: unknown;
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

export interface PlayerState {
  context: {
    uri: string | undefined;
    metadata: object;
  };
  bitrate: number;
  position: number;
  duration: number;
  paused: boolean;
  shuffle: boolean;
  repeat_mode: number;
  track_window: {
    current_track: {
      id: string;
      uri: string;
      type: string;
      linked_from_uri: any | null;
      linked_from: {
        uri: null;
        id: null;
      };
      media_type: string;
      name: string;
      duration_ms: number;
      artists: Artist;
      album: {
        uri: string;
        name: string;
        images: Image[];
      };
      is_playable: boolean;
    };
    next_tracks: [];
    previous_tracks: [];
  };
  timestamp: number;
  restrictions: {
    disallow_resuming_reasons: string[];
    disallow_skipping_prev_reasons: string[];
  };
  disallows: {
    resuming: true;
    skipping_prev: true;
  };
}

interface ListenerArgs {
  message?: string;
  device_id?: string;
  state?: any;
}

interface Listener {
  ({ message }: ListenerArgs): void;
}

interface PlayerArgs {
  name: string;
  getOAuthToken: (cb: Function) => void;
}

export interface SpotifyPlayer {
  _options: {
    getOAuthToken: Function;
    id: string;
  };
  new ({ name, getOAuthToken }: PlayerArgs): SpotifyPlayer;
  addListener: (name: string, listener: Listener) => void;
  connect: () => void;
  getCurrentState: () => Promise<PlayerState>;
  nextTrack: (uri: string) => any;
  pause: () => any;
  resume: () => void;
  togglePlay: () => void;
}

declare global {
  interface Window {
    Spotify: {
      Player: SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady: Function;
  }
}

export interface TokenInfo {
  accessToken: string;
  expiresIn: string;
  tokenType: string;
}
