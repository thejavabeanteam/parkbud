import axios from 'axios';
import {budWasSeen} from "./buds";

// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES';
const REMOVE_UNMATCHES = 'REMOVE_UNMATCHES';


// ACTION CREATOR
const getMatches = matches => ({
    type: GET_MATCHES,
    matches
});

const removedUnmatchData = (match) => ({
    type: REMOVE_UNMATCHES
});


// THUNK CREATORS
export const fetchMatches = userId =>
    dispatch => {
        axios.put('/api/match', {userId: userId})
            .then(res =>
                dispatch(getMatches(res.data)))
            .catch(err => console.log(err))};

export const addMatch = (matchId, userId) =>
    dispatch =>
        axios.post(`/api/match/`, {userId: userId, matchId: matchId})
            .then(res => dispatch(fetchMatches(userId)))
            .catch(err => console.log(err));

export const unMatch = (matchId, userId) =>
    dispatch =>
        axios.post('/api/match/delete', {userId: userId, matchId: matchId})
            .then(res => {
                dispatch(removeUnmatchedBuds());
                dispatch(fetchMatches(userId))
            })
            .catch(err => console.log(err));

export const removeUnmatchedBuds = () =>
    dispatch => {
        dispatch(removedUnmatchData());
    };


// REDUCER
export default function (state = [], action) {
    switch (action.type) {
        case GET_MATCHES:
            return action.matches;
        case REMOVE_UNMATCHES:
            return state = [];
        default:
            return state;
    }
}