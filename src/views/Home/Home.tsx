import React from 'react';
import { toCamelCaseObject } from 'helpers';

import homeStyles from './home.module.scss';

const styles = toCamelCaseObject(homeStyles);

const Home = () => (
  <div>
    <h1>HOME SCREEN TIME</h1>
  </div>
);

export default Home;
