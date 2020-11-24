import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRecipe(action) {
  try {
    yield axios.post(`/api/recipe`, action.payload);
    yield put({
      type: 'GET_RECIPE_DETAILS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* addRecipeSaga() {
  yield takeLatest('ADD_RECIPE', addRecipe);
}

export default addRecipeSaga;
