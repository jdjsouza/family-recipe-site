import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useParams } from 'react-router-dom';

// byUser is the store
class AllBy extends Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'GET_BY_USER',
    // });
    console.log(this.props.store.byUser);
    console.log(this.props.store.theCreators);
  }

  render() {
    // if (this.props.store.theCreators.id === this.params.id) {
    //   creator = this.props.store.theCreators.first_name;
    // }
    // for (let i = 0; i < this.props.store.theCreators.length; i++) {
    //   if (this.props.store.theCreators[i].id == useParams()) {
    //     const creator = this.props.store.theCreators[i].first_name;
    //     console.log(creator);
    //   }
    // }
    // let creator;
    // if (this.props.store.theCreators != undefined) {
    //   for (let i = 0; i < this.props.store.theCreators.length; i++) {
    //     if (this.props.store.theCreators[i].id == useParams()) {
    //       creator = this.props.store.theCreators[i].first_name;
    //       console.log(creator);
    //     }
    //   }
    // }
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Dishes by </h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AllBy);
