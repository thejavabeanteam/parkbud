import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// install the logout redux store
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';


export class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false,
        };
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleOutsideClick() {
        const { menuOpen } = this.state;
        if (menuOpen) {
            this.setState({ menuOpen: false });
        }
    }

    handleMenuClick() {
        const { menuOpen } = this.state;
        this.setState({ menuOpen: !menuOpen });
    }

    handleLogout() {
        this.handleOutsideClick();
        this.props.handleClick();
    }

    render() {
        const { isLoggedIn } = this.props;
        const { menuOpen } = this.state;
        return (
            <div>
                {isLoggedIn ?
                    <nav className="menu">
                        <input type="checkbox" checked={menuOpen} ref="#" className="menu-open" name="menu-open" id="menu-open" />
                        <label onClick={this.handleMenuClick} className="menu-open-button" htmlFor="menu-open">
                            <span className="lines line-1" />
                            <span className="lines line-2" />
                            <span className="lines line-3" />
                        </label>

                    {/* Include links to the other components once they've been created */}

                        <Link
                            // to="/logout" once logout component is created
                            onClick={this.handleLogout}
                            className="menu-item item-4"
                        >
                            <Tooltip
                                title="Logout"
                                position="top"
                                trigger="mouseenter"
                                delay="100"
                                distance="20"
                            >
                                <FontAwesome name="sign-out" />
                            </Tooltip>
                        </Link>
                    </nav>
                    : null
                }
            </div>
        );
    }
}

const mapState = state => ({
    currentUser: state.currentUser,
    isLoggedIn: !!state.currentUser.id,
});

const mapDispatch = dispatch => ({
    handleClick() {
        // dispatch(logout()); once the logout function has been created
    },
});

export default withRouter(connect(mapState, mapDispatch)(Menu));

Menu.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};