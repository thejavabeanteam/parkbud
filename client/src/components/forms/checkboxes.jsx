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
                        <label htmlFor={name}><small>ParkingStructure</small></label>
                        <input name="ParkingStructure" type="checkbox" value="ParkingStructure" checked={this.state.ParkingStructure} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>A</small></label>
                        <input name="A" type="checkbox" value="A" checked={this.state.A} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>B</small></label>
                        <input name="B" type="B" value="B" checked={this.state.B} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>E1</small></label>
                        <input name="E1" type="checkbox" value="E1" checked={this.state.E1} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>E2</small></label>
                        <input name="E2" type="E2" value="E2" checked={this.state.E2} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>Overflow</small></label>
                        <input name="Overflow" type="Overflow" value="overflow" checked={this.state.overflow} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>ParkingStructure2</small></label>
                        <input name="ParkingStructure2" type="checkbox" value="ParkingStructure2" checked={this.state.ParkingStructure2} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>F1</small></label>
                        <input name="F1" type="checkbox" value="F1" checked={this.state.F1} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>F2</small></label>
                        <input name="F2" type="checkbox" value="F2" checked={this.state.F2} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>H</small></label>
                        <input name="H" type="checkbox" value="H" checked={this.state.H} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>I</small></label>
                        <input name="I" type="checkbox" value="I" checked={this.state.I} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>J</small></label>
                        <input name="J" type="checkbox" value="J" checked={this.state.J} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor={name}><small>UnpavedOverflow</small></label>
                        <input name="UnpavedOverflow" type="checkbox" value="UnpavedOverflow" checked={this.state.UnpavedOverflow} onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapParkingPreferences = state => ({
    name: 'parkingPreferences',
    displayName: 'Parking Lot You Prefer to Match With:',
});

const mapParkingLot = state => ({
    name: 'currentParkingLot',
    displayName: 'Parking Lot You Currently park:',
});

export const parkingPreferences = connect(mapParkingPreferences)(Checkbox);
export const currentParkingLot = connect(mapParkingLot)(Checkbox);