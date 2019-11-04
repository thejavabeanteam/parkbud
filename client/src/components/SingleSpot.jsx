import React, { Component } from 'react';

class SingleSpot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: props.expand,
        };
    }

    onClick(e) {
        e.preventDefault();
        this.setState({ expand: !this.state.expand });
    }

    render() {
        const { user } = this.props;
        return (
            <div
                id="spotCard"
                className={
                    this.state.expand
                        ? 'expanded'
                        : 'collapsed'}
                onClick={this.onClick.bind(this)}
            >
                <div>
                    <div id="picContainer">
                        <img
                            src={
                                user.media.photos
                                    ? user.media.photos.photo[3].$t
                                    : 'http://biorem.org/wp-content/uploads/2016/07/not-available.png'}
                            className="spotPic rounded"
                            alt="spot profile pic"
                        />
                    </div>
                </div>
                <div>
                    <h1>{user.name.$t}</h1>
                    <h2>{`${user.sex.$t === 'M' ? ' Male' : ' Female'}`}</h2>
                    <h2>{user.schedule.$t}</h2>
                </div>
                <div>
                    <p>{user.message}</p>
                </div>
            </div>
        );
    }
}

export default SingleSpot;