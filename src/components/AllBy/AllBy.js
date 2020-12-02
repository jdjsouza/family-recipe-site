import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// byUser is the store
class AllBy extends Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'GET_BY_USER',
    // });
    console.log(this.props.store.byUser);
    console.log(this.props.store.theCreators);
    console.log(this.props.match.params.id);
  }

  render() {
    let creator;
    for (let i = 0; i < this.props.store.theCreators.length; i++) {
      if (this.props.store.theCreators[i].id == this.props.match.params.id) {
        creator = this.props.store.theCreators[i].first_name;
        console.log(creator);
      }
    }
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Dishes by {creator}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AllBy);
