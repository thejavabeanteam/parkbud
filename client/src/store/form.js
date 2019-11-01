//ACTION TYPES
const ADD_ITEM = 'ADD_ITEM';
const CLEAR_FORM = 'CLEAR_FORM';


//ACTION CREATORS
export const addItem = (key, value) => {
    let val = { type: ADD_ITEM, key, value }
    return val
}

export const clearForm = () => {
    let val = {type: CLEAR_FORM}
    return val
}


//THUNKS


//DEFAULTSTATE
const defaultState = {}

//REDUCER
export default function (state = defaultState, action) {
    const {key, value, type} = action
    switch (type) {
        case ADD_ITEM:
            return Object.assign({}, state, { [key]: value })
        case CLEAR_FORM:
            return defaultState
        default:
            return state
    }
}