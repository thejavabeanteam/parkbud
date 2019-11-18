import React, {Component} from 'react';
import Cards, {Card} from 'react-swipe-card';
import {connect} from 'react-redux';
import {
    fetchMatches,
    addMatch,
    fetchAllBuds,
    rejectBud,
    clearBuds, unMatch
} from '../store';
import SingleBud from "./SingleBud";

const qs = require('query-string');

const CustomAlertLeft = () => (
    <span>
    <img alt="reject pet icon" src="../reject-icon.png" className="icon" />
  </span>);
const CustomAlertRight = () => (
    <span>
    <img alt="accept pet icon" src="../favorite-icon.png" className="icon" />
  </span>);

class AllBuds extends Component {
    componentDidMount() {
        this.props.onLoad(this.props.user, qs.parse(this.props.location.search));
    }

    componentWillUnmount() {
        this.props.onDismount();
    }

    render() {
        const {buds, currentUser, onReject, onLove, onLoad} = this.props;
        return (
            <div className="container">
                <div id="card-stack" />
                <Cards
                    alertRight={<CustomAlertRight />}
                    alertLeft={<CustomAlertLeft />}
                    onEnd={() => onLoad(currentUser, qs.parse(this.props.location.search))}
                    className="master-root"
                >
                        {buds && buds.map((bud) => {
                            return (
                                <Card className="card"
                                    key={bud.id}
                                    onSwipeLeft={() => { onReject(bud.id, currentUser.id); }}
                                    onSwipeRight={() => { onLove(bud.id, currentUser.id); }}
                                >
                                    <SingleBud bud={bud} allBuds={true}/>
                                </Card>
                            )})}
                </Cards>
            </div>
        );
    }
}

const mapState = state => ({
    buds: state.buds[0],
    currentUser: state.currentUser
});

const mapDispatch = (dispatch, ownProps) => ({
    onLoad(user, parsed) {
        const prefs = {
            "dayOfWeek": `${parsed.dayOfWeek}`,
                "arrival": `${parsed.arrival}`,
                "earliest": `${parsed.earliest}`
        };
        dispatch(fetchAllBuds(user.id, prefs, user.parkingPreferences));
    },
    loadMatches(id) {
        dispatch(fetchMatches(id));
    },
    onReject(matchId, currentId) {
        dispatch(rejectBud(matchId, currentId));
    },
    onLove(matchId, currentId) {
        dispatch(addMatch(matchId, currentId));
    },
    onDismount() {
        dispatch(clearBuds);
    }
});

export default connect(mapState, mapDispatch)(AllBuds);
