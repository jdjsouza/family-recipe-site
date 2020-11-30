import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import @material-UI
import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      {/* <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link> */}
      {/* <Button variant="contained" color="primary">
        LOGIN
      </Button> */}
      <div className="nav-center">
        <Grid container spacing={1} direction="row" justify="center">
          <Grid
            item
            xs="9"
            sm="5"
            md="4"
            lg="3"
            style={{ textAlign: 'center' }}
          >
            <Link className="nav-link" to="/home">
              Home |
            </Link>
            <Link className="nav-link" to="/creator">
              Creator |
            </Link>
            <Link className="nav-link" to="/dishtype">
              Dish Type |
            </Link>
            <Link className="nav-link" to={loginLinkData.path}>
              {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
              {loginLinkData.text}
            </Link>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.store.user.id && (
              <>
                <Link className="nav-link" to="/info">
                  Info Page
                </Link>
                <LogOutButton className="nav-link" />
              </>
            )}
            {/* Always show this link since the about page is not protected */}
            {/* <Link className="nav-link" to="/about">
              About
            </Link> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
