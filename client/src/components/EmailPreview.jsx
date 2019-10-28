import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sendEmail, fetchMatches, removeUnmatchedPets } from '../store';

// const className = {
//     base: 'myClass',
//     afterOpen: 'myClass_after-open',
//     beforeClose: 'myClass_before-close'
// }

// const overlayClassName = {
//     base: 'myOverlayClass',
//     afterOpen: 'myOverlayClass_after-open',
//     beforeClose: 'myOverlayClass_before-close'
// }

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '40px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    },
};

export class EmailPreview extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onSend(user, spot) {
        sendEmail(user, spot);
        this.closeModal();
        this.props.resetMatches(user);
        this.props.history.push('/matches');
    }

    render() {
        const {
            user, spot, name, contacted,
        } = this.props;
        const buttonClass = (name === 'matches') ? 'emailEnvelope smallIcon' : 'emailEnvelope largeIconRight';
        const wasContacted = contacted ? 'check' : 'envelope-o';
        return (
            <div>
                <button className={buttonClass} onClick={this.openModal}> <FontAwesome name={wasContacted} /> </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div id="email">
                        <div className="email-header">To: {spot.contact.email.$t}
                            <br />Subject: Asking for a switch with your parking spot
                        </div>
                        <div>
                            <h3 className="email-greeting">Greetings from ParkBud!</h3>
                            <p className="email-introduction">
                                We’re reaching out to you because one of our users has shown interest
                                in switching with your current parking spot. Please review
                                the following information, and reach out to the user directly if you
                                would like to have further communication.
                            </p>
                            <h5>User Profile:</h5>
                            <div className="email-details">
                                <strong>Email: </strong><a href={user.email}>{user.email}</a>
                            </div>
                            <div className="email-details">
                                <strong>Phone Number: </strong>{user.phoneNumber}
                            </div>
                            <div className="email-details">
                                <strong>Location: </strong>{user.zipCode}
                            </div>
                            <div className="email-details">
                                <strong>Vehicle: </strong>
                                <div className="email-text plain">{user.vehicle}</div>
                            </div>
                            <div>
                                <p className="email-text plain">
                                    Thank you for using our service.
                                </p>
                                <p className="email-signoff">Sincerely,</p>
                                <div className="email-signature">The ParkBud Team</div>
                            </div>
                            <button className="email-button" id="cancel" type="button" onClick={this.closeModal}>Cancel</button>
                            <button className="email-button" type="button" onClick={() => this.onSend(user, spot)}>Yes! Send it!</button>
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}

// CONTAINER
const mapDispatch = dispatch => ({
    resetMatches(user) {
        dispatch(removeUnmatchedSpots());
        dispatch(fetchMatches(user.id));
    },
});

export default withRouter(connect(null, mapDispatch)(EmailPreview));