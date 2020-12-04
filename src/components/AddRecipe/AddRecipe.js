import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI Imports
import {
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

class AddRecipe extends Component {
  state = {
    recipe: {
      recipe_name: '',
      picture: '',
      prep_time: '',
      cook_time: '',
      brief_description: '',
      instructions: '',
      user_id: '',
      dish_id: [],
      materials: [
        {
          ingredient: '',
          quantity: '',
          unit_id: '',
        },
      ],
    },
    // data: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Side Dish', 'Dessert'],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_UNITS',
    });
    this.props.dispatch({
      type: 'GET_DISH_LIST',
    });
    console.log('in add recipe', this.props.store.theUnits);
  }

  handleSelect = (event) => {
    // this.setState({
    //   ...this.state,
    //    event.target.value,
    // });
  };

  handleCheckbox = (event) => {
    this.setState({
      dish_id: [],
    });
    console.log(this.props.store.theDisheList);
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Add a new Recipe!</h2>
        <div>
          <Grid container spacing={1} direction="row" justify="center">
            <Grid item>
              <input placeholder="Recipe Name" type="text" />
            </Grid>
          </Grid>
          <div>
            <Grid container spacing={1} direction="row" justify="center">
              <Grid item>
                <input placeholder="Ingredient" type="text" />
                <input className="input-qty" placeholder="QTY" type="number" />
                <select name="Measurement" onChange={this.handleSelect}>
                  <option value="">Measurement</option>
                  {this.props.store.theUnits.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.unit}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </div>
          <div>{/* BUTTON TO ADD MORE INGREDIENT LINES */}</div>
          <div>
            <Grid container spacing={1} direction="row" justify="center">
              <Grid item>
                {this.props.store.theDishList.map((item, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={index.toString()}
                        onChange={this.handleCheckbox}
                        name="checked"
                        color="primary"
                      />
                    }
                    label={item.dish_types}
                  />
                ))}
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid
              xs={12}
              container
              spacing={1}
              direction="row"
              justify="center"
            >
              <Grid item>
                <textarea
                  className="brief-desc"
                  placeholder="Brief Description"
                  type="text"
                  rows="4"
                  cols
                />
              </Grid>
              <Grid item>
                <textarea
                  className="cook-instruct"
                  placeholder="Cooking Instructions"
                  type="text"
                  rows="4"
                  cols
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
