import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
// import the redux components once they've been created
// import the App component
// import the "me" object from the user store

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <Router>

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
    isLoggedIn: !!state.currentUser.id,
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