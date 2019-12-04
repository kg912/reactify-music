interface PlayerArgs {
  name: string;
  getOAuthToken: (cb: Function) => void;
}

interface ListenerArgs {
  message?: string;
  device_id?: string;
}

interface Listener {
  ({ message }: ListenerArgs): void;
}

interface SpotifyPlayer {
  new ({ name, getOAuthToken }: PlayerArgs): SpotifyPlayer;
  addListener: (name: string, listener: Listener) => void;
  connect: () => void;
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
