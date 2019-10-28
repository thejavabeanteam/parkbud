import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import EmailPreview from './EmailPreview';
import { sendEmail, unMatch } from '../store';
import SingleSpot from './SingleSpot';

class MatchSingle extends Component {
    render() {
        const searchSpot = this.props.match.params.SpotId;
        const spotDetail = this.props.matchPets.filter(matchSpot => { if (matchSpot.id !== undefined) return matchSpot.id.$t === searchSpot })[0];
        const contacted = this.props.matches.filter(match => match.SpotId === Number(searchSpot))[0].contacted
        return (
            <div className="flex">
                <div id="singleMatchContainer">
                    {this.props.matchSpots.length ? (
                        <div>
                            <button
                                className="unmatch largeIconLeft"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.onUnmatch(
                                        spotDetail,
                                        this.props.currentUser.id,
                                    );
                                }}
                            >
                                <FontAwesome name="heart" />
                                <FontAwesome name="remove" />
                            </button>
                            <EmailPreview user={this.props.currentUser} spot={spotDetail} name={'matchSingle'} contacted={contacted} />
                            <SingleSpot spot={spotDetail} />
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
    matchSpots: state.matchSpots,
    matches: state.matches
});

const mapDispatch = (dispatch, ownProps) => ({
    onClick(user, spot) {
        sendEmail(user, spot);
    },
    onUnmatch(spot, userId) {
        if (window.confirm(`Are you sure you want to delete your match with ${spot.name.$t}?`))
            dispatch(unMatch(spot.id.$t, userId));
        ownProps.history.push('/matches');
    },
});

export default connect(mapState, mapDispatch)(MatchSingle);