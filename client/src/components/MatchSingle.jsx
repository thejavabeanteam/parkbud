import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {unMatch, fetchMatches} from '../store';
import SingleBud from "./SingleBud";

// COMPONENT
class MatchSingle extends Component {
    componentDidMount() {
        this.props.onLoad(this.props.userId);
    }

    render() {
        const {matches, currentUser} = this.props;
        const thisMatch = matches.filter(match => match.id === Number(this.props.match.params.matchId))[0];
        return (
            <div className="flex">
                <div id="singleMatchContainer">
                    {thisMatch ? (
                        <div>
                            <button
                                className="unmatch largeIconLeft"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.onUnmatch(
                                        thisMatch,
                                        currentUser.id,
                                    );
                                }}
                            >
                                <FontAwesome name="heart" />
                                <FontAwesome name="remove" />
                            </button>
                            <SingleBud bud={thisMatch} allBuds={false}/>
                        </div>
                    ) : (
                        <p>Loading</p>
                    )}
                </div>
            </div>
        );
    }
}

const mapState = state => ({
    currentUser: state.currentUser,
    matches: state.matches
});

const mapDispatch = (dispatch, ownProps) => ({
    onLoad(currentUserId) {
        dispatch(fetchMatches(currentUserId));
    },
    onClick(currentUser, match) {
        // TODO: show phone number as alert/pop up
    },
    onUnmatch(match, currentUserId) {
        if (window.confirm(`Are you sure you want to delete your match with ${match.name}?`))
            dispatch(unMatch(match.id, currentUserId));
        ownProps.history.push('/matches');
    }
});

export default connect(mapState, mapDispatch)(MatchSingle);