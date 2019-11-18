import React from 'react';
import {AllDays} from './AllDays'

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {earliestValid: false, arrivalValid: false};
        this.validateField = this.validateField.bind(this);
        this.allDaysElement = React.createRef();
    }

    validateField(evt) {
        evt.preventDefault();
        const fieldName = evt.target.name;
        const value = evt.target.value;
        let earliestValid = this.state.earliestValid;
        let arrivalValid = this.state.arrivalValid;

        switch (fieldName) {
            case 'earliest':
                earliestValid = (value.search(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/i) >= 0);
                this.allDaysElement.current.setState({earliest: earliestValid ? value.replace(":", "") : ''});
                break;
            case 'arrival':
                arrivalValid = (value.search(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/i) >= 0);
                this.allDaysElement.current.setState({arrival: arrivalValid ? value.replace(":", "") : ''});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="container">
            <form>
                <label>
                    Earliest Arrival Time:
                    <input name="earliest" type="time" value={this.state.value} onChange={this.validateField}/>
                </label>
                <label>
                Latest Arrival Time:
                <input name="arrival" type="time" value={this.state.value} onChange={this.validateField}/>
            </label>
            </form>
                <div className="allPetTypes">
                <AllDays ref={this.allDaysElement} {...this.state} />
                </div>
        </div>)
    }
}

export default Home;