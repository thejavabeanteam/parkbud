import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { auth } from '../store';
import logo from '../styles/logo.png';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
    const { handleSubmit } = props;
    let type;
    return (
        <div className="splash">
            <div className="form animated flipInX login-html">
                <div className="img-container">
                    <img id="logo" src={logo} alt="ParkBud logo" />
                </div>
                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
                <label htmlFor="tab-1" className="tab">Log In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" />
                <label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className="login-form">
                    <div className="sign-in-htm">
                        {/*login form*/}
                        <form onSubmit={event => handleSubmit(event, type)}>
                            <div className="group">
                                <label htmlFor="email">
                                    <small>Email</small>
                                </label>
                                <input name="email" type="text" />
                            </div>
                            <div className="group">
                                <label htmlFor="password">
                                    <small>Password</small>
                                </label>
                                <input name="password" type="password" />
                            </div>
                            <div className="group">
                                <button
                                    type="submit"
                                    onClick={() => {
                                        type = 'login';
                                    }}
                                >
                                    Log In
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className="sign-up-htm">
                        {/*signup form */}
                        <form onSubmit={event => handleSubmit(event, type)}>
                            <div className="group">
                                <label htmlFor="email">
                                    <small>Email</small>
                                </label>
                                <input name="email" type="text" />
                            </div>
                            <div className="group">
                                <label htmlFor="password">
                                    <small>Password</small>
                                </label>
                                <input name="password" type="password" />
                            </div>
                            <div className="group">
                                <label htmlFor="password">
                                    <small>Verify Password</small>
                                </label>
                                <input name="password" type="password" />
                            </div>
                            <div className="group">
                                <button
                                    type="submit"
                                    onClick={() => {
                                        type = 'signup';
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapLogin = state => {
    return {
        name: 'login',
        displayName: 'Login',
        error: state.currentUser.error
    }
};

const mapSignup = state => {
    return {
        name: 'signup',
        displayName: 'Sign Up',
        error: state.currentUser.error
    }
};

const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit(evt, type) {
        evt.preventDefault();
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        const redirect = type === 'login' ? '/home' : '/createProfile';
        Promise.resolve(dispatch(auth(email, password, type))).then((res) => {
            ownProps.history.push(redirect);
        });
    },
});



export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));


/**
 * PROP TYPES
 */
AuthForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
};