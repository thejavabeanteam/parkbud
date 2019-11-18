import axios from 'axios';

// ACTION TYPES
const GET_BUDS = 'GET_BUDS';
const CLEAR_BUDS = 'CLEAR_BUDS';

// ACTION CREATORS
const getBuds = buds => ({
    type: GET_BUDS,
    buds
});

export const clearBuds = () => ({
    type: CLEAR_BUDS
});

// THUNK
export const fetchAllBuds = (userId, prefs, parkingPrefs) =>
    (dispatch) => {
        axios.post(`/api/buds?dayOfWeek=${prefs.dayOfWeek}&earliest=${prefs.earliest}&arrival=${prefs.arrival}`,
            {userId: userId, parkingPreferences: parkingPrefs, 'Cache-Control': 'no-cache', pragma: 'no-cache'})
            .then(res => {
                dispatch(getBuds(res.data))
            });

    };

export const budWasSeen = (matchId, userId) =>
    (dispatch) => {
        axios.post(`/api/seen/`, {userId: userId, matchId: matchId})
            .catch(err => console.log(err));
    };


export const rejectBud = (matchId, userId) =>
    dispatch => {
        dispatch(budWasSeen(matchId, userId));
    };

// REDUCER
export default function (state = [], action) {
    switch (action.type) {
        case GET_BUDS:
            return [action.buds];
        case CLEAR_BUDS:
            return state = [];
        default:
            return state;
    }
};