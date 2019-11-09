import axios from 'axios';

// ACTION TYPES
const FETCH_PROFILE_BY_ID = 'FETCH_PROFILE_BY_ID';
const CLEAR_PROFILE_VIEW = 'CLEAR_PROFILE_VIEW';

// ACTION CREATORS
const fetchProfileById = (user) => ({
    type: FETCH_PROFILE_BY_ID,
    user
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

// REDUCER
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PROFILE_BY_ID:
            return [...state, action.user];
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