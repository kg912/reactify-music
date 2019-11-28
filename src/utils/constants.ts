const TEAL = 'teal';
const PURPLE = 'purple';
const RED = 'red';

interface Index {
  [k: string]: string | undefined;
}

const BASE_URL = 'https://accounts.spotify.com';

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

interface ACCENTS {
  [k: string]: AccentType;
}

export const ACCENTS: ACCENTS = {
  TEAL,
  PURPLE,
  RED
};

export const API = {
  AUTHORIZE: `${BASE_URL}/authorize?client_id={{client-id}}&redirect_uri={{redirect-uri}}&scope={{scope}}&response_type=token&show_dialog=true`,
  SIGNUP: ''
};

export type AccentType = 'teal' | 'purple' | 'red';
