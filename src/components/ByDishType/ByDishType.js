import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ByDishType extends Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>All CHANGETHIS dishes</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ByDishType);
