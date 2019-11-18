import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { fetchMatches, unMatch} from '../store';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Matches extends Component {
    componentDidMount() {
        this.props.onLoad(this.props.currentUser.id);
    }

    render() {
        return (
            <div>
                <h1>My Matches</h1>
                <div className="matchesList">
                    {this.props.matches.length ?
                        this.props.matches.map(match => {
                            return (
                                match.id &&
                                <div key={match.id} className="matches petCard">
                                    <Link to={`matches/${match.id}`}>
                                        <img
                                            src={'https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06.png'}
                                            className="petPic rounded"
                                            alt="pet profile pic"
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
                                        <div id="petInfo">
                                            <h1>{match.name}</h1>
                                        </div>
                                    </Link>
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
    onLoad(id) {
        dispatch(fetchMatches(id));
    },
    onUnmatch(match, currentUserId) {
        if (window.confirm(`Are you sure you want to delete your match with ${match.name}?`))
            dispatch(unMatch(match.id, currentUserId));
    },
    onClick(currentUser, match) {
        // TODO: show phone number via alert/pop up
    },
});

export default connect(mapState, mapDispatch)(Matches);