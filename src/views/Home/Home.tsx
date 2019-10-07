import React from 'react';
import { toCamelCase } from 'helpers';

import homeStyles from './home.module.scss';

const styles = toCamelCase(homeStyles);

const Home = () => (
  <div>
    <h1>HOME SCREEN TIME</h1>
  </div>
);

export default Home;
