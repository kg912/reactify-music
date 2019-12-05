import { noop } from 'helpers';

import { SPOTIFY_PLAYER_LISTENER } from 'utils/constants';

const {
  INITIALIZE_ERROR,
  AUTH_ERROR,
  ACCOUNT_ERROR,
  PLAYBACK_ERROR,
  PLAYER_STATE_CHANGED,
  READY,
  NOT_READY
} = SPOTIFY_PLAYER_LISTENER;

const LOG_PREFIX = '[Spotify-Player] - ';

const logError = ({ message }: { message?: string }) => {
  console.error(`${LOG_PREFIX}${message}`);
};

const createPlayer = (
  token = '',
  resolve: ({ player, deviceId }: { player: any; deviceId: string }) => void
) => () => {
  let deviceId = '';
  const { Spotify } = window;
  try {
    const player = new Spotify.Player({
      name: 'Reactify Music',
      getOAuthToken: (cb = noop) => {
        cb(token);
      }
    });

    [
      INITIALIZE_ERROR,
      AUTH_ERROR,
      ACCOUNT_ERROR,
      PLAYBACK_ERROR
    ].forEach(error => player.addListener(error, logError));

    player.addListener(PLAYER_STATE_CHANGED, state => {
      console.info(`${LOG_PREFIX}player is now in ${state} state`);
    });

    player.addListener(READY, ({ device_id }) => {
      deviceId = device_id as string;
      console.info(`${LOG_PREFIX}player is now Ready`);
    });

    // Not Ready
    player.addListener(NOT_READY, () => {
      console.info(`${LOG_PREFIX}device is offline`);
    });

    // Connect to the player!
    player.connect();

    resolve({ player, deviceId });
  } catch (e) {
    console.log(e.response);
  }
};

export function fetchSpotifyPlayer({ url = '', token = '' } = {}) {
  return new Promise((resolve, reject) => {
    window.onSpotifyWebPlaybackSDKReady = createPlayer(token, resolve);

    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = url;

    document.body.appendChild(scriptTag);
  });
}
