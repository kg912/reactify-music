import React, { Component } from 'react';
import { noop } from 'helpers';

import { AccentType } from 'utils/constants';

import SpotifyService from 'services/SpotifyService/SpotifyService';

import withSideBar from 'hoc/withSideBar/withSideBar';

import styles from './home.module.scss';
import TracksModel from 'services/SpotifyService/TracksModel';

import TrackList from './TrackList';

interface Props {
  logout?: () => void;
  accent?: AccentType;
}

interface State {
  tracks: TracksModel[];
}

const defaultProps: Readonly<Props> = {
  logout: noop,
  accent: 'teal'
};

class Home extends Component<Props, State> {
  static defaultProps = defaultProps;

  state = {
    tracks: []
  };
  async componentDidMount() {
    const tracks = await SpotifyService.getTracks(30, 50);

    if (tracks) {
      this.setState({ tracks });
    }
  }
  render() {
    const { accent } = this.props;
    const { tracks } = this.state;

    return (
      <div className={styles[`main-container-${accent}`]}>
        <h1 className={styles[`main-title`]}>Your Tracks</h1>
        {<TrackList tracks={tracks} className={styles['track-list']} />}
      </div>
    );
  }
}

export default withSideBar(Home);
