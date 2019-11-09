import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {getUserProfile, deleteAccount, clearrofileView} from '../store';

// COMPONENT
class UserHome extends Component {
    // populate this/profile
    componentDidMount() {
        this.props.onLoad(this.props.match.params.userId);
    }

    componentWillUnmount() {
        const currentProfile = this.props.match.params.userId;
        this.props.onDismount(currentProfile);
    }

    render() {
        const {user, vehicle, schedule, spot, isReadOnly, deleteUser} = this.props;
        return (
            <div className="userProfile">
                {isReadOnly ?
                    <h1>My Profile</h1>
                    : <h1> View Profile</h1>}
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
                <div className="userInfo">
                    <div>
                        <h4>Name:</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Gender:</h4>
                        <p>{user.gender}</p>
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
                    {isReadOnly
                        ? null
                        : (<div>
                            <h4>Parking Lot Preference:</h4>
                            {!user.parkingPreferences.length
                                ? <p>None</p>
                                : <ul>{user.parkingPreferences.map((parking, index) =>
                                    <li key={index}>{parking}</li>)}
                                </ul>}
                        </div>)}
                    <div>
                        <h4>Current Parking Spot:</h4>
                        {!spot.length
                            ? <p>None</p>
                            : (
                                <a href={spot.pindrop}>spot.parkingLot</>
                            )
                        }
                    </div>
                    <div>
                        <h4>Current Vehicle:</h4>
                        <p>Color: {vehicle.color}</p>
                        <p>Make: {vehicle.make}</p>
                        <p>Model: {vehicle.model}</p>
                        {isReadOnly
                            ? null
                            : (<p>Year: {vehicle.model}</p>)}
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
                {isReadOnly
                    ? null
                    : (<div className="userButtons">
                        <NavLink to="/updateProfile">
                            <button>Edit Your Profile</button>
                        </NavLink>
                        <NavLink to="/login">
                            <button id="deleteUser" onClick={event => deleteUser(event, user)}>Delete</button>
                        </NavLink>
                    </div>)
                }
            </div>
        )
    }
}


// CONTAINER
const mapState = state => ({
    user: state.profile,
    vehicle: state.vehicle,
    schedule: state.schedule,
    spot: state.spot
});

const mapDispatch = dispatch => ({
    onLoad(id) {
        dispatch(getUserProfile(id));
    },
    deleteUser(event, user) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete your account?')) {
            dispatch(deleteAccount(user));
        }
    },
    onDismount(id) {
        dispatch(clearProfileView(id));
    }
});


export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
    email: PropTypes.string,
};