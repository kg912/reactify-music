import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { API } from 'utils/constants';
import { replaceUrlParams, getEnvVariables } from 'helpers';
import { TokenInfo } from 'types';

const TOKEN_KEY = 'spotifyTokenInfo';

type APIResponse = Promise<AxiosResponse | { status: any }>;

interface SpotifyService extends TokenInfo {
  new (): SpotifyService;
  authenticate(): void;
  getTokenFromStorage(): TokenInfo | object;
  getTracks(): APIResponse;
  makeApiRequest(params: AxiosRequestConfig): APIResponse;
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

  makeApiRequest = async (params: AxiosRequestConfig) => {
    try {
      const data = await axios({
        ...params,
        headers: {
          Authorization: `${this.tokenType} ${this.accessToken}`
        }
      });

      return data;
    } catch ({ response: { status } = {} }) {
      return { status };
    }
  };

  getTracks = () => {
    return this.makeApiRequest({ method: 'get', url: API.TRACKS });
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
