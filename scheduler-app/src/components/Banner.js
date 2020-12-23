import React from 'react';
import { Title } from 'rbx';
import Welcome from './Welcome';
import SignIn from './SignIn';

const Banner = ({ user, title }) => (
    <React.Fragment>
      { user ? <Welcome user={ user } /> : <SignIn /> }
      <Title>{ title || '[loading...]' }</Title>
    </React.Fragment>
);

export default Banner;