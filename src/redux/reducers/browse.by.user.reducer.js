// Used to store list of creators from the server
const theCreators = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    default:
      return state;
  }
};

export default theCreators;
