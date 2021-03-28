import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { PlayerState } from 'types';

import Icon from 'components/Icon';
import SpotifyService, {
  PLAYBACK_EVENT
} from 'services/SpotifyService/SpotifyService';
import TrackModel from 'services/SpotifyService/TracksModel';
import styles from './tracklist.module.scss';

interface ListProps {
  className?: string;
  tracks: TrackModel[];
}

interface ListItemProps extends TrackModel {
  currentTrackId: string;
}

const { STATE_CHANGE } = PLAYBACK_EVENT;
const componentId = 'TRACK_LIST';

function findImage(images: TrackModel['album']['images']) {
  const heights = images.map(({ height }) => height);

  const Min = Math.min(...heights);
  const Max = Math.max(...heights);

  return images.find(({ height }) => height < Max && height > Min);
}

const TrackListItem = ({
  name,
  uri,
  album: { images },
  id,
  currentTrackId
}: ListItemProps) => {
  const { url = '' } = findImage(images) || {};

  return (
    <div>
      <div
        className={styles['list-item']}
        onClick={() => {
          SpotifyService.togglePlay(uri);
        }}
      >
        <img className={styles['item-image']} src={url} />
        <div className={styles['item-icon']}>
          <Icon name={id === currentTrackId ? 'pause' : 'play'} size="large" />
        </div>
      </div>
      <p className={styles['item-text']}>{name}</p>
    </div>
  );
};

const TrackList: React.FC<ListProps> = ({ tracks, className }) => {
  const classes = classnames(styles['main-container'], className);

  const [currentTrackId, setCurrentTrackId] = useState('');

  useEffect(() => {
    SpotifyService.addEventListener<PlayerState>(
      { id: componentId, eventName: STATE_CHANGE },
      ({ track_window: { current_track } = {}, paused }) => {
        const { id = '' } = current_track || {};

        if (currentTrackId !== id && !paused) {
          setCurrentTrackId(id);

          return;
        }

        setCurrentTrackId('');
      }
    );

    return () => {
      SpotifyService.removeEventListener({
        id: componentId,
        eventName: STATE_CHANGE
      });
    };
  }, [tracks.length]);

  return (
    <div className={classes}>
      <div className={styles['list']}>
        {tracks.map((item: TrackModel) => (
          <TrackListItem key={item.uri} {...{ ...item, currentTrackId }} />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
