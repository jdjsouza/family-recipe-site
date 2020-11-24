// Used to store list of recipes by dish type from the server
const theDishes = (state = [], action) => {
  switch (action.type) {
    case 'SET_BY_DISH_TYPES':
      return action.payload;
    default:
      return state;
  }
};

export default theDishes;
