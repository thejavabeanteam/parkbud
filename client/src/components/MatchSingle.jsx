import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import EmailPreview from './EmailPreview';
import {clearMatchView, getMatchByMatchId, sendEmail, unMatch} from '../store';
import UserHome from "./user-home";

// COMPONENT
class MatchSingle extends Component {
    componentDidMount() {
        // populate state.thisMatch
        this.props.onLoad(this.props.currentUser, this.props.match.params.matchId);
    }

    componentWillUnmount() {
        // refresh query
        const currentMatch = this.props.match.params.matchId;
        this.props.onDismount(currentMatch);
    }
    render() {
        const {thisMatch} = this.props;
        const contacted = thisMatch.contacted;
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
                                        this.props.currentUser.id,
                                    );
                                }}
                            >
                                <FontAwesome name="heart" />
                                <FontAwesome name="remove" />
                            </button>
                            <EmailPreview currentUser={this.props.currentUser} user={thisMatch} name={'matchSingle'} contacted={contacted} />
                            <UserHome userId={thisMatch.id} isReadOnly={true} />
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
    thisMatch: state.thisMatch
});

const mapDispatch = (dispatch, ownProps) => ({
    onLoad(currentUser, matchId) {
        dispatch(getMatchByMatchId(currentUser.id, matchId));
    },
    onClick(currentUser, match) {
        sendEmail(currentUser, match);
    },
    onUnmatch(match, currentUserId) {
        if (window.confirm(`Are you sure you want to delete your match with ${match.name}?`))
            dispatch(unMatch(match.id, currentUserId));
        ownProps.history.push('/matches');
    },
    onDismount(matchId) {
        dispatch(clearMatchView(matchId));
    }
});

export default connect(mapState, mapDispatch)(MatchSingle);