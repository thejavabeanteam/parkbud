import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {
    Login,
    UserHome,
    AllBuds,
    CreateProfile,
    UpdateProfile,
    Home,
    Matches,
    MatchSingle
} from './components';
import App from './App';
import {me, logout} from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const {isLoggedIn, currentUser, doLogout} = this.props;

        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" render={() => (
                            isLoggedIn
                                ? (<Redirect to="/home"/>)
                                : (<Login/>)
                        )}/>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/createProfile" component={CreateProfile}/>
                        {
                            isLoggedIn &&
                            <Switch>
                                <Route path="/user" render={(props) => <UserHome {...props} userId={currentUser.id}/>}/>
                                <Route path="/updateProfile" component={UpdateProfile}/>
                                <Route exact path="/home" component={Home}/>
                                <Route exact path="/buds" render={(props) => <AllBuds {...props} user={currentUser}/>}/>
                                <Route exact path="/matches"
                                       render={(props) => <Matches {...props} userId={currentUser.id}/>}/>
                                <Route exact path="/matches/:matchId"
                                       render={(props) => <MatchSingle {...props} userId={currentUser.id}/>}/>
                                <Route path="/logout" render={doLogout}/>
                            </Switch>
                        }
                        <Route component={Login}/>
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
    isLoggedIn: !!state.currentUser.id,
    currentUser: state.currentUser,
    matches: state.matches,
});

const mapDispatch = dispatch => ({
    loadInitialData() {
        dispatch(me())
    },
    doLogout() {
        dispatch(logout());
        dispatch(me());
    }
});

export default connect(mapState, mapDispatch)(Routes);