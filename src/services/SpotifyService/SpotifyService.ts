import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { API } from 'utils/constants';
import { replaceUrlParams, getEnvVariables } from 'helpers';
import { TokenInfo } from 'types';

import { TrackAPIResponse } from './SpotifyAPITypes';

import Track from './TracksModel';

const TOKEN_KEY = 'spotifyTokenInfo';

interface APIData {
  data?: Object;
  status: number;
}

interface SpotifyService extends TokenInfo {
  new (): SpotifyService;
  authenticate(): void;
  getTokenFromStorage(): TokenInfo | object;
  setToken(tokenInfo: TokenInfo): void;
  clearToken(): void;
  signup(): void;
}

class SpotifyService implements SpotifyService {
  accessToken = '';
  expiresIn = '';
  tokenType = '';

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

  makeApiRequest<T>(params: AxiosRequestConfig) {
    return axios.request<T>({
      ...params,
      headers: {
        Authorization: `${this.tokenType} ${this.accessToken}`
      }
    });
  }

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
