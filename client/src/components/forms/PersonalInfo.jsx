import React from 'react';
import {FormErrors} from './FormErrors';

export class PersonalInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emailVisitedBefore: false,
            emailValid: true,
            formValid: true,
            fieldErrors: {email: ''}
        };
        this.validateField = this.validateField.bind(this);
        this.validateOnChange = this.validateOnChange.bind(this);
        this.markAsVisited = this.markAsVisited.bind(this);
    }

    validateField(evt) {
        evt.preventDefault();
        const value = evt.target.value;

        let fieldValidationErrors = this.state.fieldErrors;
        let emailValid = (value.search(/^([\w.%+-]+)@cpp.edu$/i) >= 0);
        fieldValidationErrors.email = emailValid ? '' : ' must be a CPP email';

        this.setState({fieldErrors: fieldValidationErrors,
            emailValid: emailValid,
            formValid: emailValid
        });
    }

    validateOnChange(evt, onChangeFunction, fieldStatus) {
        onChangeFunction(evt);
        if (fieldStatus) {
            this.validateField(evt);
        }
    }

    markAsVisited(field){
        this.setState({ [field]: true });
    }

    render(){
        const { nextPage, onChange, defaultValue, form, display } = this.props;
        const { fieldErrors, formValid, emailVisitedBefore } = this.state;
        return (
            <form>
                <h2>{display}</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder={defaultValue('email')}
                        value={form.email}
                        onChange={event => {
                            onChange(event);
                            if (emailVisitedBefore) this.validateField(event);
                        }}
                        onBlur={event => {
                            this.markAsVisited('emailVisitedBefore');
                            this.validateField(event)
                        }}
                        required
                    />
                    <FormErrors field={'Email'} error={fieldErrors.email} />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="text"
                        placeholder={defaultValue('phoneNumber')}
                        value={form.phoneNumber}
                        onChange={event => onChange(event)}
                    />
                </div>
                <button onClick={nextPage} type="submit" disabled={!formValid}>Next</button>
            </form>
        );
    }
}