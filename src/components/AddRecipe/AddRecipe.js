import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI Imports
import { Grid, TextField, Box } from '@material-ui/core';

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
      materials: [
        {
          ingredient: '',
          quantity: '',
          unit_id: '',
        },
      ],
    },
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_UNITS',
    });
    console.log(this.props.store.theUnits);
  }

  handleSelect = (event) => {
    // this.setState({
    //   ...this.state,
    //    event.target.value,
    // });
  };

  render() {
    let units;
    if (this.props.store.theUnits === undefined) {
      units = <option value="loading">Loading...</option>;
    } else {
      units = this.props.store.theUnits.map((option) => {
        <option key={option.id} value={option.id}>
          {option.unit}
        </option>;
      });
    }
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Add a new Recipe!</h2>
        <div>
          <input placeholder="Recipe Name" type="text" />
          <div>
            <input placeholder="Ingredient" type="text" />
            <input className="input-qty" placeholder="QTY" type="number" />
            <select name="Measurement" onChange={this.handleSelect}>
              <option key="0" value="0">
                Measurements
              </option>
              {units}
            </select>
          </div>
          {/* BUTTON TO ADD MORE INGREDIENT LINES */}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
0;