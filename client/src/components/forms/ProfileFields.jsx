import React from 'react';
import Home from '../Home'

export const ParkingLotPreferences = (props) => {
    const { nextPage, previousPage, onCheck } = props;
    return (
        <form>
            <Home onCheck={onCheck}/>
            <button onClick={previousPage}>Back</button>
            <button onClick={nextPage} type="submit">Next</button>
        </form>
    )
};