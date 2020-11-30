import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// Import @material-UI
import Grid from '@material-ui/core/Grid';

class LandingPage extends Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'GET_RANDOM_DETAILS',
    // });
    console.log(this.props.store.randomDetails);
  }
  render() {
    return (
      <Grid container spacing={1} direction="row" justify="center">
        <Grid item xs="12" style={{ textAlign: 'center' }}>
          <p>
            I need the recipe name {this.props.store.randomDetails.recipe_name}
          </p>
          <img
            src={this.props.store.randomDetails.picture}
            alt={this.props.store.randomDetails.recipe_name}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
