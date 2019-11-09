import React, {Component} from 'react';
import Cards, {Card} from 'react-swipe-card';
import {connect} from 'react-redux';
import {fetchMatches, addMatches, fetchAllBuds, rejectBud} from '../store';
import FontAwesome from "react-fontawesome";

const CustomAlertLeft = () => (
    <span>
        <FontAwesome name="remove"/>
  </span>);
const CustomAlertRight = () => (
    <span>
        <FontAwesome name="heart"/>
  </span>);

class AllBuds extends Component {
    componentDidMount() {
        this.props.onLoad(this.props.currentUser);
    }

    render() {
        const {buds, currentUser, onReject, onLove, onLoad} = this.props;
        return (
            <div className="container">
                <div id="card-stack"/>
                <Cards
                    alertRight={<CustomAlertRight/>}
                    alertLeft={<CustomAlertLeft/>}
                    onEnd={() => onLoad(currentUser)}
                    className="master-root"
                >
                    {buds && buds.map((bud) => {
                        return (
                            <Card
                                key={bud.id}
                                onSwipeLeft={() => {
                                    onReject(bud.id, currentUser.id);
                                }}
                                onSwipeRight={() => {
                                    onLove(bud.id, currentUser.id);
                                }}
                            >
                                <SingleBud bud={bud} expand={false}/>
                            </Card>
                        )
                    })}
                </Cards>
            </div>
        );
    }
}

const mapState = state => ({
    buds: state.buds,
    currentUser: state.currentUser,
});

const mapDispatch = (dispatch, ownProps) => ({
    onLoad(user) {
        for (let i = 0; i < 25; i++) {
            dispatch(fetchAllBuds(user));
        }
    },
    loadMatches(id) {
        dispatch(fetchMatches(id));
    },
    onReject(matchId, currentId) {
        dispatch(rejectBud(matchId, currentId));
    },
    onLove(matchId, currentId) {
        dispatch(addMatches(matchId, currentId));
    }
});

export default connect(mapState, mapDispatch)(AllBuds);
