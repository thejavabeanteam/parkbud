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
                        this.props.matchSpots.map(user => {
                            const contacted = user.id && this.props.matches.filter(match => match.userId === Number(user.id.$t))[0].contacted
                            return (
                                user.id &&
                                <div key={user.id.$t} className="matches spotCard">
                                    <Link to={`matches/${user.id.$t}`}>
                                        <img
                                            src={
                                                user.media.photos
                                                    ? user.media.photos.photo[3].$t
                                                    : 'http://biorem.org/wp-content/uploads/2016/07/not-available.png'}
                                            className="spotPic rounded"
                                            alt="spot profile pic"
                                        />
                                        <button
                                            className="unmatch smallIcon"
                                            onClick={(event) => {
                                                event.preventDefault(); this.props.onUnmatch(user, this.props.currentUser.id);
                                            }}
                                        >
                                            <FontAwesome name="heart" />
                                            <FontAwesome name="remove" />
                                        </button>
                                        <button
                                            className="emailEnvelope smallIcon"
                                            onClick={(event) => {
                                                event.preventDefault(); this.props.onClick(this.props.currentUser, user);
                                            }}
                                        > <FontAwesome name="envelope-o" />
                                        </button>
                                        <div id="spotInfo">
                                            <h1>{user.name.$t}</h1>
                                            <h2>{user.parking.$t}</h2>
                                        </div>
                                    </Link>
                                    <EmailPreview currentUser={this.props.currentUser} user={user} name="matches" contacted={contacted} />
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
    onUnmatch(user, curretnUserId) {
        if (window.confirm(`Are you sure you want to delete your match with ${user.name.$t}?`))
            dispatch(unMatch(user.id.$t, currentUserId));
    },
    onClick(currentUser, user) {
        sendEmail(currentUser, user);
    },
});

export default connect(mapState, mapDispatch)(Matches);