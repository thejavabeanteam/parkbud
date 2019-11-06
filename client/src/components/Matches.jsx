import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { sendEmail, unMatch } from '../store';
import { connect } from 'react-redux';
import { EmailPreview } from './';

class Matches extends Component {
    render() {
        return (
            <div>
                <h1>My Matches</h1>
                <div className="matchesList">
                    {this.props.matches.length ?
                        this.props.matches.map(match => {
                            const contacted = match.id && match.contacted
                            return (
                                match.id &&
                                <div key={match.id} className="matches userCard">
                                    <Link to={`matches/${match.id}`}>
                                        <img
                                            src={
                                                // eventually add the ability for user to upload profile pics
                                                // match.media.photos
                                                //     ? match.media.photos.photo[3]
                                                //     :
                                                    'http://biorem.org/wp-content/uploads/2016/07/not-available.png'}
                                            className="spotPic rounded"
                                            alt="spot profile pic"
                                        />
                                        <button
                                            className="unmatch smallIcon"
                                            onClick={(event) => {
                                                event.preventDefault(); this.props.onUnmatch(match, this.props.currentUser.id);
                                            }}
                                        >
                                            <FontAwesome name="heart" />
                                            <FontAwesome name="remove" />
                                        </button>
                                        <button
                                            className="emailEnvelope smallIcon"
                                            onClick={(event) => {
                                                event.preventDefault(); this.props.onClick(this.props.currentUser, match);
                                            }}
                                        > <FontAwesome name="envelope-o" />
                                        </button>
                                        <div id="budInfo">
                                            <h1>{match.email}</h1>
                                        </div>
                                    </Link>
                                    <EmailPreview currentUser={this.props.currentUser} user={match} name="matches" contacted={contacted} />
                                </div>
                            )})
                        : <p>NO MATCHES!</p>
                    }
                </div>
            </div>
        );
    }
}

const mapState = state => ({
    currentUser: state.currentUser,
    matches: state.matches
});

const mapDispatch = dispatch => ({
    onUnmatch(match, currentUserId) {
        if (window.confirm(`Are you sure you want to delete your match with ${match.email}?`))
            dispatch(unMatch(match.id, currentUserId));
    },
    onClick(currentUser, match) {
        sendEmail(currentUser, match);
    },
});

export default connect(mapState, mapDispatch)(Matches);