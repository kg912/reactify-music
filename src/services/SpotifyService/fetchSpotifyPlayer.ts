import { noop } from 'helpers';

import { SPOTIFY_PLAYER_LISTENER } from 'utils/constants';

import { PlayerState } from 'types';

const {
  INITIALIZE_ERROR,
  AUTH_ERROR,
  ACCOUNT_ERROR,
  PLAYBACK_ERROR,
  PLAYER_STATE_CHANGED,
  READY,
  NOT_READY
} = SPOTIFY_PLAYER_LISTENER;

interface createPlayerArgs {
  player: any;
  deviceId: string;
}

interface Message {
  message: string;
}

const LOG_PREFIX = '[Spotify-Player] - ';

const logError = (listenerName: string) => ({
  message
}: {
  message?: string;
}) => {
  console.error(`${LOG_PREFIX}${message} < ${listenerName}`);
};

const createPlayer = (
  token = '',
  resolve: ({ player, deviceId }: createPlayerArgs) => void,
  onPlayerStateChange: (state: PlayerState) => void,
  onPlayerAuthError: () => void
) => () => {
  let deviceId = '';
  const { Spotify } = window;

  const player = new Spotify.Player({
    name: 'Reactify Music',
    getOAuthToken: (cb = noop) => {
      cb(token);
    }
  });

  [INITIALIZE_ERROR, ACCOUNT_ERROR, PLAYBACK_ERROR].forEach(error =>
    player.addListener(error, logError(error))
  );

  player.addListener(AUTH_ERROR, ({ message }) => {
    console.error(`${LOG_PREFIX}${message}`);

    onPlayerAuthError();
  });

  player.addListener(PLAYER_STATE_CHANGED, state => {
    console.info(`${LOG_PREFIX}player state changed`);

    onPlayerStateChange(state as PlayerState);
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
};

export function fetchSpotifyPlayer({
  url = '',
  token = '',
  onPlayerStateChange = (state: PlayerState) => {},
  onPlayerAuthError = () => {}
} = {}) {
  return new Promise((resolve, reject) => {
    window.onSpotifyWebPlaybackSDKReady = createPlayer(
      token,
      resolve,
      onPlayerStateChange,
      onPlayerAuthError
    );

    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = url;

    document.body.appendChild(scriptTag);
  });
}
