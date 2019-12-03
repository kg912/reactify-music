import React, { Component } from 'react';
import { noop } from 'helpers';

import { AccentType } from 'utils/constants';

import SpotifyService from 'services/SpotifyService/SpotifyService';

import withSideBar from 'hoc/withSideBar/withSideBar';

import styles from './home.module.scss';
import TracksModel from 'services/SpotifyService/TracksModel';

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
    const { logout = noop } = this.props;
    const { tracks, status } = await SpotifyService.getTracks();

    if (status === 401) {
      logout();
    }

    if (tracks) {
      this.setState({ tracks });
    }
  }

  getTrackList() {
    const { tracks } = this.state;

    if (!tracks) {
      return null;
    }

    return tracks.map((item: TracksModel) => (
      <div className={styles['list-item']}>{item.name}</div>
    ));
  }
  render() {
    const { accent } = this.props;

    return (
      <div className={styles[`main-container-${accent}`]}>
        <h1 className={styles[`main-title`]}>Your Tracks</h1>
        {this.getTrackList()}
      </div>
    );
  }
}

export default withSideBar(Home);
