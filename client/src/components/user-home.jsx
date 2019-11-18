import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {deleteAccount} from '../store';

// COMPONENT
class UserHome extends Component {
    render() {
        const {currentUser} = this.props;
        return (
            <div className="userProfile">
                <h1>My Profile</h1>
                <img
                    src={'https://pbs.twimg.com/profile_images/423624945802153985/wDPO-ztt.jpeg'}
                    className="petPic rounded"
                    alt="pet profile pic"
                />
                <div className="userInfo">
                    <div>
                        <h4>Name:</h4>
                        <p>{currentUser.name}</p>
                    </div>
                    <div>
                        <h4>Gender:</h4>
                        <p>{currentUser.gender}</p>
                    </div>
                    <div>
                        <h4>Email:</h4>
                        <p>{currentUser.email}</p>
                    </div>
                    <div>
                        <h4>Phone Number:</h4>
                        <p>{currentUser.phoneNumber}</p>
                    </div>
                    <div>
                        <h4>Parking Lot Preference:</h4>
                        {!currentUser.parkingPreferences
                            ? <p>None</p>
                            : <ul>{currentUser.parkingPreferences.map((parking, index) =>
                                <li key={index}>{parking}</li>)}
                            </ul>}
                    </div>
                    <div>
                        <h4>Current Parking Spot:</h4>
                        {!currentUser.parkingSpot
                            ? <p>None</p>
                            : (
                                <a href={currentUser.parkingSpot.pindrop}>{currentUser.parkingSpot.parkingLot}</a>
                            )
                        }
                        <div className="userButtons">
                            <NavLink to="/setSpot">
                                <button>Update/Remove Spot</button>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <h4>Current Vehicle:</h4>
                        {!currentUser.vehicle
                            ? <p>None Registered</p>
                            : (
                                <div>
                                    <p>Color: {currentUser.vehicle.color}</p>
                                    <p>Make: {currentUser.vehicle.make}</p>
                                    <p>Model: {currentUser.vehicle.model}</p>
                                    <p>Year: {currentUser.vehicle.year}</p>
                                </div>)
                        }
                    </div>
                    <div>
                        <h4>Schedule:</h4>
                        {!currentUser.schedule
                            ? <p>No Parking Schedule Given</p>
                            : <ul>{currentUser.schedule.map((day) =>
                                <li key={day.dayOfWeek}>{day.dayOfWeek}: Departure: {day.departure}</li>)}
                            </ul>}
                    </div>
                    <div>
                        <h4>Message:</h4>
                        <p>{currentUser.message}</p>
                    </div>
                </div>
                <div className="userButtons">
                    <NavLink to="/updateProfile">
                        <button>Edit Your Profile</button>
                    </NavLink>
                    <NavLink to="/login">
                        <button id="deleteUser" onClick={event => this.props.deleteUser(event, currentUser)}>Delete
                        </button>
                    </NavLink>
                </div>
            </div>
        )
    }
}


// CONTAINER
const mapState = state => ({
    currentUser: state.currentUser
});

const mapDispatch = dispatch => ({
    deleteUser(event, user) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete your account?')) {
            dispatch(deleteAccount(user));
        }
    }
});

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
    email: PropTypes.string,
};