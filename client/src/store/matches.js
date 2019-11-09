import axios from 'axios';
import fetchProfileById from './profile'

// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES';
const GET_MATCH = 'GET_MATCH';
const CREATE_MATCHES = 'CREATE_MATCHES';
const REMOVE_UNMATCHES = 'REMOVE_UNMATCHES';
const CLEAR_MATCH_VIEW = 'CLEAR_MATCH_VIEW';


// ACTION CREATOR
const getMatches = matches => ({
    type: GET_MATCHES,
    matches,
});

const getMatch = thisMatch => ({
    type: GET_MATCH,
    thisMatch
});

const createMatches = match => ({
    type: CREATE_MATCHES,
    match,
});

const removedUnmatchData = (match) => ({
    type: REMOVE_UNMATCHES
});

export const clearMatchView = matchId => ({
    type: CLEAR_MATCH_VIEW,
    matchId
});


// THUNK CREATORS
export const fetchMatches = userId =>
    dispatch =>
        axios.get(`/api/match/${userId}`)
            .then(res =>
                dispatch(getMatches(res.data)))
            .then(results => results.matches.map( user => dispatch(fetchUserById(user.userId))))
            .catch(err => console.log(err));

export const getSingleMatch = (user, match) =>
    dispatch =>
        axios.get(`/api/user/${match.id}`)
            .then(res =>
                dispatch(getMatch(res.data)));

const markContacted = (user, match) => {
    axios.put(`/api/match/${user.id}`, {matchId: match.id})
};

export const sendEmail = (user, match) => {
    markContacted(user, match)
    // TODO(mlabisi): Setup contact with twilio
    // axios.get(`/api/contact?userEmail=${user.email}&userPhoneNumber=${user.phoneNumber}&userZipCode=${user.zipCode}`)
        .catch(err => console.log(err));
};

export const userWasSeen = (userId) =>
    (dispatch) => {
        axios.post('/api/seen', { userId })
            .catch(err => console.log(err));
    };

export const rejectUser = (userId) =>
    (dispatch) => {
        dispatch(userWasSeen(userId));
    };

export const addMatches = (userId) =>
    dispatch =>
        axios.post(`/api/match/${userId}`)
            .then((res) => {
                dispatch(userWasSeen(userId));
                dispatch(createMatches(res.data));
                dispatch(fetchUserById(userId));
            })
            .catch(err => console.log(err));

export const unMatch = (matchId, userId) =>
    dispatch =>
        axios.delete(`/api/match/${userId}`, {data:{matchId: matchId}})
            .then((res) => {
                dispatch(removeUnmatchedUsers());
                dispatch(fetchMatches(userId))
            })
            .catch(err => console.log(err));

export const fetchUserById = (id) =>
    dispatch => {
        fetchProfileById(id)
            .catch(err => console.log(err));
    };

export const removeUnmatchedUsers = () =>
    dispatch => {
        dispatch(removedUnmatchData());
    };


// REDUCER
export default function (state = [], action) {
    switch (action.type) {
        case GET_MATCHES:
            return action.matches;
        case GET_MATCH:
            return [...state, action.match];
        case CREATE_MATCHES:
            return action.thisMatch;
        case REMOVE_UNMATCHES:
            return state = [];
        case CLEAR_MATCH_VIEW:
        {
            const newState = {...state};
            newState[action.matchId] = [];
            return newState;
        }
        default:
            return state;
    }
}