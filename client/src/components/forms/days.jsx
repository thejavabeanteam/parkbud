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
        const { name, displayName, subtitle, form } = this.props;

        return (
            <div>
                <legend>{displayName}</legend>
                <p>{subtitle}</p>
                <div className="checkboxes">
                    <div>
                        <label htmlFor={name}><small>Monday</small></label>
                        <input name="Monday" type="time" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Tuesday</small></label>
                        <input name="Tuesday" type="time" value="Tuesday" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Wednesday</small></label>
                        <input name="Wednesday" type="time" value="Wednesday" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Thursday</small></label>
                        <input name="Thursday" type="time" value="Thursday" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Friday</small></label>
                        <input name="Friday" type="time" value="Friday" onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapSchedule = state => ({
    name: 'dayOfWeek',
    displayName: 'At what times do you leave campus?',
    subtitle: 'Leave empty if you\'re not on campus that day'
});


export const Days = connect(mapSchedule)(Checkbox);
