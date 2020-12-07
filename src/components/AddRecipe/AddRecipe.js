import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

// Material-UI Imports
import { Grid, Checkbox, FormControlLabel, Button } from '@material-ui/core';

class AddRecipe extends Component {
  state = {
    recipe: {
      recipe_name: '',
      picture: '',
      prep_time: '',
      cook_time: '',
      brief_description: '',
      instructions: '',
      user_id: this.props.store.user.id,
      dish_id: [],
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
    this.props.dispatch({
      type: 'GET_DISH_LIST',
    });
    console.log('in add recipe', this.props.store.theUnits);
  }

  handleSelect(i, event) {
    const { name, value } = event.target;
    let materials = [...this.state.recipe.materials];
    materials[i] = { ...materials[i], unit_id: value };
    this.setState({
      recipe: {
        ...this.state.recipe,
        materials,
      },
    });
  }

  handleIngredientChange(i, event) {
    const { name, value } = event.target;
    let materials = [...this.state.recipe.materials];
    materials[i] = { ...materials[i], [name]: value };
    this.setState({
      recipe: {
        ...this.state.recipe,
        materials,
      },
    });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        [propertyName]: event.target.value,
      },
    });
  };

  handleCheckbox = (event) => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        dish_id: [...this.state.recipe.dish_id, event.target.value],
      },
    });
  };

  handleSave = () => {
    this.props.dispatch({
      type: 'ADD_RECIPE',
      payload: this.state.recipe,
    });
  };

  addIngredients = () => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        materials: [
          ...this.state.recipe.materials,
          { ingredient: '', quantity: '', unit_id: '' },
        ],
      },
    });
  };

  render() {
    const ingredientFields = this.state.recipe.materials.map((el, i) => {
      return (
        <div key={i}>
          <input
            placeholder="Ingredient"
            type="text"
            name="ingredient"
            // value={el.ingredient || ''}
            onChange={this.handleIngredientChange.bind(this, i)}
          />
          <input
            className="input-qty"
            placeholder="QTY"
            type="number"
            name="quantity"
            // value={el.quantity || ''}
            onChange={this.handleIngredientChange.bind(this, i)}
          />
          <select
            key={i}
            name="unit_id"
            // value={el.Measurement || ''}
            onChange={this.handleSelect.bind(this, i)}
          >
            <option>Measurement</option>
            {this.props.store.theUnits.map((item, index) => (
              <option key={index} value={item.id}>
                {item.unit}
              </option>
            ))}
          </select>
        </div>
      );
    });
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Add a new Recipe!</h2>
        <div>
          <Grid container spacing={1} direction="row" justify="center">
            <Grid item>
              <input
                placeholder="Recipe Name"
                type="text"
                onChange={this.handleChangeFor('recipe_name')}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} direction="row" justify="center">
            <Grid item>
              <input
                key="1"
                placeholder="Prep Time"
                type="number"
                onChange={this.handleChangeFor('prep_time')}
              />
              <input
                key="2"
                placeholder="Cook Time"
                type="number"
                onChange={this.handleChangeFor('cook_time')}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} direction="row" justify="center">
            <Grid item>{ingredientFields}</Grid>
          </Grid>

          <Grid container spacing={1} direction="row" justify="center">
            <Grid item>
              <Button onClick={this.addIngredients} variant="contained">
                Add another Ingredient
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} direction="row" justify="center">
            <Grid item>
              {this.props.store.theDishList.map((item, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      key={index.toString()}
                      value={item.id}
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

          <Grid container spacing={1} direction="row" justify="center">
            <Grid item xs={10}>
              <textarea
                className="brief-desc"
                placeholder="Brief Description"
                type="text"
                rows="4"
                cols
                onChange={this.handleChangeFor('brief_description')}
              />
            </Grid>
            <Grid item xs={10}>
              <textarea
                className="cook-instruct"
                placeholder="Cooking Instructions"
                type="text"
                rows="4"
                cols
                onChange={this.handleChangeFor('instructions')}
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: '20px' }}>
            <Grid container spacing={10} direction="row" justify="center">
              <Grid item>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                  <Button variant="contained">Cancel</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                  <Button onClick={this.handleSave} variant="contained">
                    Save
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
