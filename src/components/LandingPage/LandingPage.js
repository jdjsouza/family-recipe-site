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
    console.log(this.props.store.randomDetails.ingredients);
  }
  render() {
    let ingredientList;
    if (this.props.store.randomDetails.ingredients === undefined) {
      ingredientList = `<li key="1">Loading...</li>`;
    } else {
      ingredientList = this.props.store.randomDetails.ingredients.map(
        (item, index) => {
          return (
            <li item key={index}>
              {item}{' '}
            </li>
          );
        }
      );
    }
    let updated = '';
    let posted;
    if (this.props.store.randomDetails.date_updated != null) {
      const date_updated = this.props.store.randomDetails.date_updated;
      const updatedYear = date_updated.substring(0, 4);
      const updatedMonth = date_updated.substring(5, 7);
      const updatedDay = date_updated.substring(8, 10);
      const updatedDate = updatedMonth + '/' + updatedDay + '/' + updatedYear;
      updated = `Updated: ${updatedDate}`;
    }
    if (this.props.store.randomDetails.date_posted != null) {
      const date_posted = this.props.store.randomDetails.date_posted;
      const postedYear = date_posted.substring(0, 4);
      const postedMonth = date_posted.substring(5, 7);
      const postedDay = date_posted.substring(8, 10);
      posted = postedMonth + '/' + postedDay + '/' + postedYear;
    }
    return (
      <Grid container spacing={1} direction="row" justify="center">
        <Grid item xs={10} style={{ textAlign: 'center' }}>
          <h2 item xs={4} wrap="wrap" className="recipe-title">
            {this.props.store.randomDetails.recipe_name}
          </h2>
        </Grid>
        <Grid item xs={10} style={{ textAlign: 'center' }}>
          <span item wrap="wrap">
            Creator: {this.props.store.randomDetails.first_name} Posted:{' '}
            {posted} {updated}
          </span>
        </Grid>
        <Grid item xs={8} style={{ textAlign: 'center' }}>
          <img
            className="food-image"
            src={this.props.store.randomDetails.picture}
            alt={this.props.store.randomDetails.recipe_name}
          />
        </Grid>
        <Grid item xs={10} style={{ textAlign: 'center' }}>
          <p item>{this.props.store.randomDetails.brief_description}</p>
        </Grid>
        <Grid container spacing={1} direction="row" justify="center">
          <Grid item xs={4}>
            <div item>
              Prep Time: {this.props.store.randomDetails.prep_time}
            </div>
            <div item>
              Cook Time: {this.props.store.randomDetails.cook_time}
            </div>
            <ul item style={{ listStyleType: 'none' }}>
              {ingredientList}
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <div className="instructions" style={{ whiteSpace: 'pre-wrap' }}>
            {this.props.store.randomDetails.instructions}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
