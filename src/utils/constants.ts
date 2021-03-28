const TEAL = 'teal';
const PURPLE = 'purple';
const RED = 'red';

interface Index {
  [k: string]: string | undefined;
}

const ACCOUNTS_URL = 'https://accounts.spotify.com';
const BASE_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_PLAYER_URL = 'https://sdk.scdn.co/spotify-player.js';

export const SIDEBAR_TITLE = 'Reactify Music';

export const REGEX = {
  SYMBOL: /[^a-zA-Z0-9]/
};

export const COLORS: Index = {
  BLACK: '#000000',
  GRAY: '#282c34',
  MEDIUM_GRAY: '#414752',
  TEAL: ' #09d3ac',
  PURPLE: '#948ced',
  RED: '#b34f44'
};

export const SPOTIFY_PLAYER_LISTENER = {
  INITIALIZE_ERROR: 'initialization_error',
  AUTH_ERROR: 'authentication_error',
  ACCOUNT_ERROR: 'account_error',
  PLAYBACK_ERROR: 'playback_error',
  PLAYER_STATE_CHANGED: 'player_state_changed',
  READY: 'ready',
  NOT_READY: 'not_ready'
};

interface ACCENTS {
  [k: string]: AccentType;
}

export const ACCENTS: ACCENTS = {
  TEAL,
  PURPLE,
  RED
};

export const API = {
  ALBUMS: `${BASE_URL}/me/albums`,
  AUTHORIZE: `${ACCOUNTS_URL}/authorize?client_id={{client-id}}&redirect_uri={{redirect-uri}}&scope={{scope}}&response_type=token&show_dialog=true`,
  SIGNUP: 'https://spotify.com/signup',
  TRACKS: `${BASE_URL}/me/tracks`,
  PLAY: 'https://api.spotify.com/v1/me/player/play?device_id={{id}}'
};

export type AccentType = 'teal' | 'purple' | 'red';
