import React from 'react';
import ParkingLots from '../ParkingLots'

export const ParkingLotPreferences = (props) => {
    const { nextPage, previousPage, onCheck } = props;
    return (
        <form>
            <ParkingLots onCheck={onCheck}/>
            <button onClick={previousPage}>Back</button>
            <button onClick={nextPage} type="submit">Next</button>
        </form>
    )
}