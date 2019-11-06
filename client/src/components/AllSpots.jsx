import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card';
import { connect } from 'react-redux';
import { fetchMatches, addMatches, fetchAllBuds, rejectBud } from '../store';
import SingleBud from './SingleBud';

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
        this.props.onLoad(this.props.currentUser);
    }

        const parking = this.props.match.params.type;
        this.props.onDismount(parking);
    }

    render() {
        const { users, currentUser, onReject, onLove, onLoad, match  } = this.props
        const parkingLotArray = users[match.params.type];
        return (
            <div className="container">
                <div id="card-stack" />
                <Cards
                    alertRight={<CustomAlertRight />}
                    alertLeft={<CustomAlertLeft />}
                    onEnd={() => onLoad(currentUser)}
                    className="master-root"
                >
                    {parkingLotArray && parkingLotArray.map((user) => {
                        return (
                            <Card
                                key={user.id.$t}
                                onSwipeLeft={() => { onReject(user.id.$t, currentUser.id, match.params.type); }}
                                onSwipeRight={() => { onLove(user.id.$t, currentUser.id, match.params.type); }}
                            >
                                <SingleSpot user={user} expand={false} />
                            </Card>
                        )})}
                </Cards>
            </div>
        );
    }
}

const mapState = state => ({
    users: state.users,
    currentUser: state.currentUser,
});

const mapDispatch = (dispatch, ownProps) => ({
    onLoad(user) {
        for (let i = 0; i < 25; i++) {
            dispatch(fetchAllSpots(ownProps.match.params.type, user));
        }
    },
    loadMatches(id) {
        dispatch(fetchMatches(id));
    },
    onReject(userId, currentUserId, parkingLot) {
        dispatch(rejectSpot(userId, currentUserId, parkingLot));
    },
    onLove(userId, currentUserId, parkingLot) {
        dispatch(addMatches(userId, currentUserId, parkingLot));
    },
    onDismount(parkingLot) {
        dispatch(clearSpots(parkingLot));
    },
});

export default connect(mapState, mapDispatch)(AllSpots);
