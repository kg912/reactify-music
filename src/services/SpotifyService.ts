import { API } from 'utils/constants';
import { replaceUrlParams } from 'helpers';

import { getEnvVariables } from 'helpers';
import { globalAgent } from 'http';

const TOKEN_KEY = 'spotifyTokenInfo';

class SpotifyService {
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

  setToken(tokenInfo = {}) {
    Object.assign(this, tokenInfo);

    Object.assign(global, { loca: localStorage });

    console.log('assigning tokenInof', tokenInfo);

    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo));
  }

  clearToken() {
    this.accessToken = '';
    this.expiresIn = '';
    this.tokenType = '';

    localStorage.removeItem(TOKEN_KEY);
  }

  signup = () => {
    window.open('https://spotify.com/signup');
  };
}

export default new SpotifyService();
