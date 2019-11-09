import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sendEmail, fetchMatches, removeUnmatchedBuds, clearProfileView, getUserProfile} from '../store';


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

    onSend(currentUser, match) {
        sendEmail(currentUser, match);
        this.closeModal();
        this.props.resetMatches(currentUser);
        this.props.history.push('/matches');
    }

    componentDidMount() {
        // populate state.thisMatch
        this.props.onLoad(this.props.matchId);
    }

    render() {
        const {
            currentUser, user: match, name, contacted,
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
                        <div className="email-header">To: {match.email}
                            <br />Subject: Requesting for a switch of your parking spot.
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
                                <strong>Name: </strong>{currentUser.name}
                            </div>
                            <div className="email-details">
                                <strong>Email: </strong><a href={currentUser.email}>{currentUser.email}</a>
                            </div>
                            <div className="email-details">
                                <strong>Phone Number: </strong>{currentUser.phoneNumber}
                            </div>
                            <div className="email-details">
                                <strong>Vehicle: </strong>{currentUser.vehicle}
                            </div>
                            <div>
                                <p className="email-text plain">
                                    Thank you for using our service.
                                </p>
                                <p className="email-signoff">Sincerely,</p>
                                <div className="email-signature">The ParkBud Team</div>
                            </div>
                            <button className="email-button" id="cancel" type="button" onClick={this.closeModal}>Cancel</button>
                            <button className="email-button" type="button" onClick={() => this.onSend(currentUser, match)}>Yes! Send it!</button>
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}

// CONTAINER
const mapState = state => ({
    user: state.profile
});


const mapDispatch = dispatch => ({
    onLoad(id) {
        dispatch(getUserProfile(id));
    },
    resetMatches(currentUser) {
        dispatch(removeUnmatchedBuds());
        dispatch(fetchMatches(currentUser.id));
    },
    onDismount(id) {
        dispatch(clearProfileView(id));
    }
});

export default withRouter(connect(null, mapDispatch)(EmailPreview));