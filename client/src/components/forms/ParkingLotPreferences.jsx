import React from 'react';
import { ParkingPreferences } from './checkboxes'

export const ParkingLotPreferences = (props) => {
    const { nextPage, previousPage, onCheck } = props
    return (
        <form>
            <ParkingPreferences onCheck={onCheck}/>
            <button onClick={previousPage}>Back</button>
            <button onClick={nextPage} type="submit">Next</button>
        </form>
    )
}