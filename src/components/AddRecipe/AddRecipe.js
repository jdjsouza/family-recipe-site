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

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Add a new Recipe!</h2>
        <div>
          <input placeholder="Recipe Name" type="text" />
          <div>
            <input placeholder="Ingredient" type="text" />
            <input className="input-qty" placeholder="QTY" type="number" />
          </div>
          {/* BUTTON TO ADD MORE INGREDIENT LINES */}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
0;
