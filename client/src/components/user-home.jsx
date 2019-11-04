import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteAccount } from '../store';
import Matches from './Matches';

// COMPONENT

export const UserHome = (props) => {
    const { user, deleteUser } = props;
    const userId = user.id;
    return (
        <div className="userProfile">
            <h1>My Profile</h1>
            <div className="userInfo">
                <div>
                    <h4>Name:</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Sex:</h4>
                    <p>{user.sex}</p>
                </div>
                <div>
                    <h4>Email:</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Phone Number:</h4>
                    <p>{user.phoneNumber}</p>
                </div>
                <div>
                    <h4>Zip Code:</h4>
                    <p>{user.zipCode}</p>
                </div>
                <div>
                    <h4>Parking Lot Preference:</h4>
                    {!user.parkingPreferences.length
                        ? <p>None</p>
                        : <ul>{user.parkingPreferences.map((parking, index) =>
                            <li key={index}>{parking}</li>)}
                        </ul> }
                </div>
                <div>
                    <h4>Current Parking:</h4>
                    {!user.currentParkingLot.length
                        ? <p>None</p>
                        : <ul>{user.currentParkingLot.map((parking, index) =>
                            <li key={index}>{parking}</li>)}
                        </ul>}
                </div>
                <div>
                    <h4>Current Vehicle:</h4>
                    <p>{user.vehicle}</p>
                </div>
                <div>
                    <h4>Name:</h4>
                    <p>{user.schedule}</p>
                </div>
                <div>
                    <h4>Message:</h4>
                    <p>{user.message}</p>
                </div>
            </div>
            <div className="userButtons">
                <NavLink to="/updateProfile">
                    <button>Edit Your Profile</button>
                </NavLink>
                <NavLink to="/login">
                    <button id="deleteUser" onClick={event => deleteUser(event, userId)}>Delete</button>
                </NavLink>
            </div>
            <Matches userId={props.user.id} />
        </div>
    );
};


// CONTAINER
const mapState = state => ({ user: state.currentUser });

const mapDispatch = dispatch => ({
    deleteUser(event, userId) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete your account?')) {
            dispatch(deleteAccount(userId));
        }
    },
});


export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
    email: PropTypes.string,
};