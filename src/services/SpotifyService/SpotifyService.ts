import axios, { AxiosRequestConfig } from 'axios';

import { API, SPOTIFY_PLAYER_URL } from 'utils/constants';
import { replaceUrlParams, getEnvVariables, noop } from 'helpers';
import {
  TokenInfo,
  TrackAPIResponse,
  SpotifyServiceType,
  SpotifyPlayer,
  APIData,
  PlayerState,
} from 'types';
import { fetchSpotifyPlayer } from './fetchSpotifyPlayer';

import EventHandler from 'utils/EventHandler';

import Track from './TracksModel';

const TOKEN_KEY = 'spotifyTokenInfo';

export const PLAYBACK_EVENT = {
  STATE_CHANGE: 'onStateChange',
};

class SpotifyService extends EventHandler implements SpotifyServiceType {
  accessToken = '';
  expiresIn = '';
  tokenType = '';
  player!: SpotifyPlayer;
  deviceId = '';
  private state!: PlayerState;
  private logout = noop;
  private currentUri: string = '';

  constructor() {
    super();
    Object.assign(
      this,
      getEnvVariables(['client-id', 'redirect-uri', 'scope'])
    );

    this.registerEvent(PLAYBACK_EVENT.STATE_CHANGE);
  }

  authenticate() {
    const url = replaceUrlParams(API.AUTHORIZE, this);

    window.open(url, '_self');
  }

  signup = () => {
    window.open(API.SIGNUP);
  };

  getTokenFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(TOKEN_KEY) || '');
    } catch (_) {
      return {};
    }
  }

  setToken(tokenInfo: TokenInfo) {
    Object.assign(this, tokenInfo);

    this.initializePlayer();

    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo));
  }

  clearToken() {
    this.accessToken = '';
    this.expiresIn = '';
    this.tokenType = '';

    localStorage.removeItem(TOKEN_KEY);
  }

  setLogoutSwitch = (logout: () => void) => {
    this.logout = logout;
  };

  private makeAxiosRequest<T = APIData>(params: AxiosRequestConfig) {
    const { headers = {} } = params || {};

    return axios.request<T>({
      ...params,
      headers: {
        Authorization: `${this.tokenType} ${this.accessToken}`,
        ...headers,
      },
      // @ts-ignore
      market: 'from_token',
    });
  }

  private async makeApiRequest<T = APIData>(config: AxiosRequestConfig) {
    try {
      const { data, status } = await this.makeAxiosRequest<T>(config);

      return { data, status };
    } catch (error) {
      const { response: { status = 401 } = {} } = error || {};
      this.logout();

      return { status };
    }
  }

  getTracks = async (offset: number = 0, limit: number = 20) => {
    const {
      data: { items = [] } = {},
    } = await this.makeApiRequest<TrackAPIResponse>({
      method: 'get',
      url: `${API.TRACKS}?offset=${offset}&limit=${limit}`,
    });

    if (!items.length) {
      return [];
    }

    return items.map((track: any) => new Track(track));
  };

  getAlbums = async () => {
    const { data } = await this.makeApiRequest({
      method: 'get',
      url: API.ALBUMS,
    });

    return data;
  };

  initializePlayer = async () => {
    if (this.player) {
      return;
    }

    const { player, deviceId } = (await fetchSpotifyPlayer({
      url: SPOTIFY_PLAYER_URL,
      token: this.accessToken,
      onPlayerStateChange: this.onPlayerStateChange,
      onPlayerAuthError: this.onPlayerAuthError,
    })) as { player: SpotifyPlayer; deviceId: string };

    // @ts-ignore
    window.player = player;
    this.player = player;
    this.deviceId = deviceId;
  };

  isPaused() {
    if (!this.state) {
      return true;
    }

    const { paused } = this.state || {};

    return paused;
  }

  togglePlay = (uri: string) => {
    const isSameTrack = uri === this.currentUri;

    if (!this.player) {
      return;
    }

    const pause = this.player.pause.bind(this.player);
    const resume = this.player.resume.bind(this.player);

    if (!isSameTrack) {
      return this.playMusic(uri);
    }

    if (this.isPaused()) {
      resume();
    } else {
      pause();
    }
  };

  playMusic = (spotifyUri: string) => {
    if (!this.player) {
      return;
    }

    this.currentUri = spotifyUri;

    const {
      _options: { getOAuthToken, id },
    } = this.player;

    getOAuthToken(async () => {
      await this.makeApiRequest({
        url: replaceUrlParams(API.PLAY, { id }),
        method: 'PUT',
        data: JSON.stringify({ uris: [spotifyUri] }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  };

  private onPlayerAuthError = () => this.logout();

  private onPlayerStateChange = (state: PlayerState) => {
    this.dispatchEvent<PlayerState>(PLAYBACK_EVENT.STATE_CHANGE, state);

    this.state = state;
  };
}

export default new SpotifyService();
