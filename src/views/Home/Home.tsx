import React, { Component } from 'react';
import { toCamelCaseObject, noop } from 'helpers';

import SpotifyService from 'services/SpotifyService';

import withSideBar from 'hoc/withSideBar/withSideBar';

import homeStyles from './home.module.scss';

const styles = toCamelCaseObject(homeStyles);

interface Props {
  logout?: () => void;
}

class Home extends Component<Props> {
  static defaultProps: Readonly<Props> = {
    logout: noop
  };

  async componentDidMount() {
    const { logout = noop } = this.props;
    const response = await SpotifyService.getTracks();

    if (response.status === 401) {
      logout();
    }
  }
  render() {
    return (
      <div className={styles.mainContainer}>
        <h1>HOME SCREEN TIME</h1>
      </div>
    );
  }
}

export default withSideBar(Home);
