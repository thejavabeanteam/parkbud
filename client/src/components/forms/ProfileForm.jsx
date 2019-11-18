import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {addItem, clearForm, auth, updateUser} from '../../store';
import {PersonalInfo} from './PersonalInfo';
import {ScheduleForm} from './ScheduleForm';


// COMPONENT
class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.assignValue = this.assignValue.bind(this);
    }

    assignValue(inputName) {
        const {form, user} = this.props;
        return (form[inputName] && form[inputName].length)
            ? form[inputName]
            : user[inputName];
    }

    nextPage(evt) {
        evt.preventDefault();
        this.setState({page: this.state.page + 1});
    }

    previousPage(evt) {
        evt.preventDefault();
        this.setState({page: this.state.page - 1});
    }


    render() {
        const {
            handleSubmit, handleChange, handleCheckbox, user, form, name, history, display
        } = this.props;
        const {page, validation} = this.state;
        return (
            <div className="splash">
                <div className="form animated flipInX">
                    <div>
                        {page === 1 && <PersonalInfo
                            display={display}
                            nextPage={this.nextPage}
                            onChange={handleChange}
                            defaultValue={this.assignValue}
                            user={user}
                            form={form}
                        />}
                        {page === 2 && <ScheduleForm
                            previousPage={this.previousPage}
                            nextPage={this.nextPage}
                            onChange={handleChange}
                            defaultValue={this.assignValue}
                            user={user}
                            form={form}
                            submitForm={() => handleSubmit(user.id, form, name, history)}
                        />}
                        {/*{page === 3 && <ProfileForm*/}
                        {/*    previousPage={this.previousPage}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    onCheck={handleCheckbox}*/}
                        {/*    defaultValue={this.assignValue}*/}
                        {/*    submitForm={() => handleSubmit(user.id, form, name, history)}*/}
                        {/*    user={user}*/}
                        {/*    form={form}*/}
                        {/*/>}*/}

                    </div>
                </div>
            </div>
        );
    }
}

// CONTAINER
const mapCreateProfile = (state, ownProps) => ({
    user: state.currentUser,
    form: state.form,
    name: 'createProfile',
    display: 'Create a profile to get started!',
    history: ownProps.history,
});

const mapUpdateProfile = (state, ownProps) => ({
    user: state.currentUser,
    form: state.form,
    name: 'updateProfile',
    display: 'Update your profile',
    history: ownProps.history,
});

const mapDispatch = dispatch => ({
    handleChange(evt) {
        const key = evt.target.name;
        const value = evt.target.value;
        dispatch(addItem(key, value));
    },
    handleCheckbox(checkboxState, componentName) {
        const key =
            componentName === 'parkingPreferences'
                ? 'parkingPreferences'
                : 'otherParkingLot';
        const array = _.keys(_.pickBy(checkboxState));
        dispatch(addItem(key, array));
    },
    handleSubmit(userId, formState, name, history) {
        if (name === 'createProfile') {
            Promise.resolve(dispatch(auth(formState.email, formState.password, "signup")))
                .then(() => {
                    dispatch(clearForm());
                    history.push("/home");
                })
                .catch(err => console.log(err));
        } else {
            Promise.resolve(dispatch(updateUser(userId, formState)))
                .then(() => {
                    dispatch(clearForm());
                    history.push("/user");
                })
                .catch(err => console.log(err));
        }
    },
});

export const CreateProfile = withRouter(connect(mapCreateProfile, mapDispatch)(ProfileForm));
export const UpdateProfile = withRouter(connect(mapUpdateProfile, mapDispatch)(ProfileForm));
