import axios from 'axios';

// ACTION TYPES
const GET_BUDS = 'GET_BUDS';
const REJECT_BUD = 'REJECT_BUD';

// ACTION CREATORS
const getBuds = buds => ({
    type: GET_BUDS,
    buds
});

// THUNK
export const fetchAllBuds = userId =>
    dispatch =>
        axios.get(`/api/buds/${userId}`)
            .then(res =>
                dispatch(getBuds(res.data)))
            .catch(err => console.log(err));

export const budWasSeen = (matchId, userId) =>
    dispatch => {
        axios.post(`/api/seen/${userId}`, { matchId: matchId })
            .catch(err => console.log(err));
    };

export const rejectBud = (matchId, userId) =>
    dispatch => {
        dispatch(budWasSeen(matchId, userId));
    };

// REDUCER
export default function(state = [], action) {
    switch (action.type) {
        case GET_BUDS:
            return [action.buds]
        default:
            return state;
    }
};