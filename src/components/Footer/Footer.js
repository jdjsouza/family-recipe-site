import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <div className="nav-btm">
    <Grid container spacing={1} direction="row" justify="center">
      <Grid item xs="5" sm="5" md="4" lg="3" style={{ textAlign: 'center' }}>
        <Link className="btm-nav-link" to="/about">
          About |
        </Link>
        <Link className="btm-nav-link" to="/registration">
          Register{' '}
        </Link>
      </Grid>
    </Grid>
  </div>
);

export default Footer;
