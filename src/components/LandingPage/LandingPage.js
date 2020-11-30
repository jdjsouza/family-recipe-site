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
    const ingredientList = this.props.store.randomDetails.ingredients.map(
      (item, index) => {
        return <li key={index}>{item} </li>;
      }
    );
    let updated;
    let posted;
    if (this.props.store.randomDetails.date_updated != null) {
      updated = this.props.store.randomDetails.date_updated;
    } else {
      updated = 'never';
    }
    if (this.props.store.randomDetails.date_posted != null) {
      posted = this.props.store.randomDetails.date_posted.substring(0, 10);
    }
    return (
      <Grid container spacing={1} direction="row" justify="center">
        <Grid item xs="10" style={{ textAlign: 'center' }}>
          <h2 className="recipe-title">
            {this.props.store.randomDetails.recipe_name}
          </h2>
        </Grid>
        <Grid item xs="10" style={{ textAlign: 'center' }}>
          <div className="creator-info">
            <p>
              Creator: {this.props.store.randomDetails.first_name} Posted:{' '}
              {posted}
            </p>
          </div>
        </Grid>
        <Grid item xs="8" style={{ textAlign: 'center' }}>
          <img
            src={this.props.store.randomDetails.picture}
            alt={this.props.store.randomDetails.recipe_name}
          />
        </Grid>
        <Grid item xs="10" style={{ textAlign: 'center' }}>
          <p>{this.props.store.randomDetails.brief_description}</p>
        </Grid>
        <Grid container spacing={0} direction="row" justify="center">
          <Grid item xs="4" sm="3">
            <div style={{ float: 'right' }}>
              Prep Time: {this.props.store.randomDetails.prep_time}
            </div>
            <div>Cook Time: {this.props.store.randomDetails.cook_time}</div>
            <ul className="ingredientList" style={{ listStyleType: 'none' }}>
              {ingredientList}
            </ul>
          </Grid>
        </Grid>
        <Grid item xs="10" style={{ textAlign: 'center' }}>
          <div style={{ overflow: 'visible' }}>
            {this.props.store.randomDetails.instructions}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
