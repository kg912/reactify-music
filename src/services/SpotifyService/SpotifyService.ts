import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { API, SPOTIFY_PLAYER_URL } from 'utils/constants';
import { replaceUrlParams, getEnvVariables } from 'helpers';
import { TokenInfo } from 'types';
import { fetchSpotifyPlayer } from './fetchSpotifyPlayer';

import { TrackAPIResponse, SpotifyServiceType, APIData } from './SpotifyTypes';

import Track from './TracksModel';

const TOKEN_KEY = 'spotifyTokenInfo';

class SpotifyService implements SpotifyServiceType {
  accessToken = '';
  expiresIn = '';
  tokenType = '';
  player = null;
  deviceId = '';

  constructor() {
    Object.assign(
      this,
      getEnvVariables(['client-id', 'redirect-uri', 'scope'])
    );
  }

  authenticate() {
    const url = replaceUrlParams(API.AUTHORIZE, this);

    window.open(url, '_self');
  }

  getTokenFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(TOKEN_KEY) || '');
    } catch (_) {
      return {};
    }
  }

  makeApiRequest<T = APIData>(params: AxiosRequestConfig) {
    return axios.request<T>({
      ...params,
      headers: {
        Authorization: `${this.tokenType} ${this.accessToken}`
      }
    });
  }

  initializePlayer = async () => {
    const { player, deviceId } = (await fetchSpotifyPlayer({
      url: SPOTIFY_PLAYER_URL,
      token: this.accessToken
    })) as { player: any; deviceId: string };

    this.player = player;
    this.deviceId = deviceId;
  };

  getTracks = async (offset: number = 0, limit: number = 20) => {
    try {
      const {
        data: { items },
        status
      } = await this.makeApiRequest<TrackAPIResponse>({
        method: 'get',
        url: `${API.TRACKS}?offset=${offset}&limit=${limit}`
      });

      const tracks = items.map(({ track }) => new Track(track));

      return { tracks, status };
    } catch ({ response: { status } }) {
      return { status };
    }
  };

  getAlbums = () => {
    return this.makeApiRequest({ method: 'get', url: API.ALBUMS });
  };

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

  signup = () => {
    window.open(API.SIGNUP);
  };
}

export default new SpotifyService();
