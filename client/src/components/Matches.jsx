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
                        this.props.matchSpots.map(spot => {
                            const contacted = spot.id && this.props.matches.filter(match => match.spotId === Number(spot.id.$t))[0].contacted
                            return (
                                spot.id &&
                                <div key={spot.id.$t} className="matches spotCard">
                                    <Link to={`matches/${spot.id.$t}`}>
                                        <img
                                            src={
                                                spot.media.photos
                                                    ? spot.media.photos.photo[3].$t
                                                    : 'http://biorem.org/wp-content/uploads/2016/07/not-available.png'}
                                            className="spotPic rounded"
                                            alt="spot profile pic"
                                        />
                                        <button
                                            className="unmatch smallIcon"
                                            onClick={(event) => {
                                                event.preventDefault(); this.props.onUnmatch(spot, this.props.currentUser.id);
                                            }}
                                        >
                                            <FontAwesome name="heart" />
                                            <FontAwesome name="remove" />
                                        </button>
                                        <button
                                            className="emailEnvelope smallIcon"
                                            onClick={(event) => {
                                                event.preventDefault(); this.props.onClick(this.props.currentUser, spot);
                                            }}
                                        > <FontAwesome name="envelope-o" />
                                        </button>
                                        <div id="spotInfo">
                                            <h1>{spot.name.$t}</h1>
                                            <h2>{spot.parkingName.$t}</h2>
                                        </div>
                                    </Link>
                                    <EmailPreview user={this.props.currentUser} spot={spot} name="matches" contacted={contacted} />
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
    matches: state.matches,
    matchSpots: state.matchSpots,
});

const mapDispatch = dispatch => ({
    onUnmatch(spot, userId) {
        if (window.confirm(`Are you sure you want to delete your match with ${spot.name.$t}?`))
            dispatch(unMatch(spot.id.$t, userId));
    },
    onClick(user, spot) {
        sendEmail(user, spot);
    },
});

export default connect(mapState, mapDispatch)(Matches);