import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, UserHome, AllBuds, CreateProfile, UpdateProfile, ParkingLots, Matches, MatchSingle, EmailPreview  } from './components';
import App from './App';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
    const { isLoggedIn, currentUser } = this.props;

        return (
            <Router>
        <App>
          <Switch>
            <Route exact path="/" render={() => ( isLoggedIn ? ( <Redirect to="/buds" />) : (
                <Login />
              )
            )}
            />
            <Route exact path="/login" component={Login} />
            <Route path="/createProfile" component={CreateProfile} />
            {
              isLoggedIn &&
                <Switch>
                  <Route path="/users" render={(props) => <UserHome {...props} userId={currentUser.id} />} />
                  <Route path="/updateProfile" component={UpdateProfile} />
                  <Route exact path="/buds" render={(props) => <AllBuds {...props} userId={currentUser.id} />} />
                  <Route exact path="/matches" render={(props) => <Matches {...props} userId={currentUser.id} />} />
                  <Route exact path="/matches/:matchId" render={(props) => <MatchSingle {...props} userId={currentUser.id} />} />
                  <Route path="/emailPreview" component={EmailPreview} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </App>
            </Router>
        );
    }
}

/**
 * CONTAINER
 */
const mapState = state => ({
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !state.currentUser.error,
    currentUser: state.currentUser,
    matches: state.matches,
});

const mapDispatch = dispatch => ({
    loadInitialData() {
        dispatch(me())
    }
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};