import axios from 'axios';

// ACTION TYPES
const GET_MATCHES = 'GET_MATCHES';
const CREATE_MATCHES = 'CREATE_MATCHES';
const FETCH_USER_BY_ID = 'FETCH_PET_BY_ID';
const REMOVE_UNMATCHES = 'REMOVE_UNMATCHES';


// ACTION CREATOR
const getMatches = matches => ({
    type: GET_MATCHES,
    matches,
});

const createMatches = match => ({
    type: CREATE_MATCHES,
    match,
});

const fetchOneUserById = (user) => ({
    type: FETCH_USER_BY_ID,
    user
});

const removedUnmatchData = () => ({
    type: REMOVE_UNMATCHES
});


// THUNK CREATORS
export const fetchMatches = userId =>
    dispatch =>
        axios.get(`/api/match/${userId}`)
            .then(res =>
                dispatch(getMatches(res.data)))
            .then(results => results.matches.map( user => dispatch(fetchUserById(user.userId))))
            .catch(err => console.log(err));


const markContacted = (user, match) => {
    axios.put(`/api/match/${user.id}`, {"matchId": match.id})
};

export const sendEmail = (user) => {
    markContacted(user);
    axios.get(`/api/contact?userEmail=${user.email}&userPhoneNumber=${user.phoneNumber}&userZipCode=${user.zipCode}`)
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
        axios.post('/api/match', { userId })
            .then((res) => {
                dispatch(userWasSeen(userId));
                dispatch(createMatches(res.data));
                dispatch(fetchUserById(userId));
            })
            .catch(err => console.log(err));

export const unMatch = (userId) =>
    dispatch =>
        axios.delete('/api/match', {data:{userId: userId}})
            .then((res) => {
                dispatch(removeUnmatchedUser());
                dispatch(fetchMatches(userId))
            })
            .catch(err => console.log(err));

export const fetchUserById = (petId) =>
    dispatch => {
        axios.get(`/api/user/findById/${userId}`)
            .then((res) => {
                dispatch(fetchOneUserById(res.data));
            })
            .catch(err => console.log(err));
    };

export const removeUnmatchedUser = () =>
    dispatch => {
        dispatch(removedUnmatchData());
    };


// REDUCER
export default function (state = [], action) {
    switch (action.type) {
        case GET_MATCHES:
            return action.matches;
        case CREATE_MATCHES:
            return [...state, action.match];
        default:
            return state;
    }
}