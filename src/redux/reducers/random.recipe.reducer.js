// Used to store random recipe details returned from the server
const randomDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_Random':
      return action.payload;
    default:
      return state;
  }
};

export default randomDetails;
