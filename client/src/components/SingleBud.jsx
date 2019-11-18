import React, {Component} from 'react';

class SingleBud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: props.expand
        };
    }

    onClick(e) {
        e.preventDefault();
        if (!this.props.allBuds)
            this.setState({expand: !this.state.expand});
    }

    render() {
        const {bud} = this.props;
        const day = bud.days[0];
        const spot = bud.parkingSpot;
        const vehicle = bud.vehicle;
        return (
            <div
                id="petCard"
                className={
                    (this.state.expand || this.props.allBuds)
                        ? 'expanded'
                        : 'collapsed'}
                onClick={this.onClick.bind(this)}
            >
                <div>
                    <div id="picContainer">
                        <div><img
                            src={'https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06.png'}
                            className="petPic rounded"
                            alt="pet profile pic"
                        />
                            <div>
                                <h2>{bud.name}<br/>
                                    is leaving Lot {spot.parkingLot} <br/>
                                    today at {day.departure} </h2>

                            </div>
                            <div>
                                {this.props.allBuds ? null : (
                                    <div>
                                        <h4>Name:</h4>
                                        <p>{bud.name}</p>
                                        <h4>Gender:</h4>
                                        <p>{bud.gender}</p>
                                        <h4>Current Vehicle:</h4>
                                        {!vehicle
                                            ? <p>None Registered</p>
                                            : (
                                                <div>
                                                    <p>Color: {vehicle.color}</p>
                                                    <p>Make: {vehicle.make}</p>
                                                    <p>Model: {vehicle.model}</p>
                                                </div>)}
                                        <h4>Message:</h4>
                                        <p>{bud.message && bud.message.length > 500 ? `${bud.message.slice(0, 500)}...` : bud.message}</p>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default SingleBud;

