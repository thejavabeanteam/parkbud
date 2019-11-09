import axios from 'axios';

// ACTION TYPES
const FETCH_PROFILE_BY_ID = 'FETCH_PROFILE_BY_ID';
const CLEAR_PROFILE_VIEW = 'CLEAR_PROFILE_VIEW';
const GET_USER_SCHEDULE = 'GET_USER_SCHEDULE';
const GET_USER_VEHICLE = 'GET_USER_VEHICLE';
const GET_USER_SPOT = 'GET_USER_SPOT';

// ACTION CREATORS
const fetchProfileById = (user) => ({
    type: FETCH_PROFILE_BY_ID,
    user
});

const fetchUserVehicle = (vehicle) => ({
    type: GET_USER_VEHICLE,
    vehicle
});

const fetchUserSchedule = (schedule) => ({
    type: GET_USER_SCHEDULE,
    schedule
});

const fetchUserSpot = (spot) => ({
    type: GET_USER_SPOT,
    spot
});

export const clearProfileView = (user) => ({
    type: CLEAR_PROFILE_VIEW,
    user
});

// THUNK
export const getUserProfile = (userId) =>
    dispatch => {
        axios.get(`/api/user/${userId}`)
            .then((res) => {
                dispatch(fetchProfileById(res.data));
            })
            .catch(err => console.log(err));
    };

export const getUserVehicle = (userId) =>
    dispatch => {
        axios.get(`/api/user/vehicle/${userId}`)
            .then((res) => {
                dispatch(fetchUserVehicle(res.data));
            })
            .catch(err => console.log(err));
    };

export const getUserSchedule = (userId) =>
    dispatch => {
        axios.get(`/api/user/schedule/${userId}`)
            .then((res) => {
                dispatch(fetchUserSchedule(res.data));
            })
            .catch(err => console.log(err));
    };

export const getUserSpot = (userId) =>
    dispatch => {
        axios.get(`/api/user/vehicle/spot/${userId}`)
            .then((res) => {
                dispatch(fetchUserSpot(res.data));
            })
            .catch(err => console.log(err));
    };

// REDUCER
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PROFILE_BY_ID:
            return [...state, action.user];
        case GET_USER_VEHICLE:
            return action.vehicle;
        case GET_USER_SCHEDULE:
            return action.schedule;
        case GET_USER_SPOT:
            return action.spot;
        case CLEAR_PROFILE_VIEW:
        {
            const newState = { ...state};
            newState[action.user] = null;
            return newState;
        }
        default:
            return state;
    }
}