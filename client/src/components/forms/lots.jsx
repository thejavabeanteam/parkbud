import React from 'react';
import { connect } from 'react-redux';

class Checkbox extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.checked;
        Promise.resolve(this.setState({
            [event.target.name]: value,
        }))
            .then(() => { this.props.onCheck(this.state, this.props.name); });
    }

    render() {
        const { name, displayName } = this.props;

        return (
            <div>
                <legend>{displayName}</legend>
                <div className="checkboxes">
                    <div>
                        <label htmlFor={name}><small>Monday</small></label>
                        <input name="Monday" type="checkbox" value="Monday" checked={this.state.Monday} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Tuesday</small></label>
                        <input name="Tuesday" type="checkbox" value="Tuesday" checked={this.state.Tuesday} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Wednesday</small></label>
                        <input name="Wednesday" type="Wednesday" value="Wednesday" checked={this.state.Wednesday} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Thursday</small></label>
                        <input name="Thursday" type="checkbox" value="Thursday" checked={this.state.Thursday} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Friday</small></label>
                        <input name="Friday" type="Friday" value="Friday" checked={this.state.Friday} onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapParkingPreferences = state => ({
    name: 'dayOfWeek',
    displayName: 'What day of the week are you looking to match on?',
});

const mapParkingLot = state => ({
    name: 'currentParkingLot',
    displayName: 'Parking Lot You Currently park:',
});

export const parkingPreferences = connect(mapParkingPreferences)(Checkbox);
export const currentParkingLot = connect(mapParkingLot)(Checkbox);