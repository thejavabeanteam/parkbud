import {Link} from "react-router-dom";
import React from "react";

export class AllDays extends React.Component {
    render() {
        return (
                <div>
                    <div className="petTypeContainer">
                        <Link
                            to={`/buds?dayOfWeek=Monday&arrival=${this.state ? this.state.arrival : ''}&earliest=${this.state ? this.state.earliest : ''}`}>
                            <picture>
                                <source srcSet="./monday.webp" type="image/webp"/>
                                <source srcSet="./monday.png" type="image/png"/>
                                <img srcSet="./monday.png" className="typeIcon" alt="monday icon"/>
                            </picture>
                            <h2 className="parkingLotsText">Monday</h2>
                        </Link>
                    </div>
                    <div className="petTypeContainer">
                        <Link
                            to={`/buds?dayOfWeek=Tuesday&arrival=${this.state ? this.state.arrival : ''}&earliest=${this.state ? this.state.earliest : ''}`}>
                            <picture>
                                <source srcSet="./tuesday.webp" type="image/webp"/>
                                <source srcSet="./tuesday.png" type="image/png"/>
                                <img srcSet="./tuesday.png" className="typeIcon" alt="tuesday icon"/>
                            </picture>
                            <h2 className="parkingLotsText">Tuesday</h2>
                        </Link>
                    </div>
                    <div className="petTypeContainer">
                        <Link
                            to={`/buds?dayOfWeek=Wednesday&arrival=${this.state ? this.state.arrival : ''}&earliest=${this.state ? this.state.earliest : ''}`}>
                            <picture>
                                <source srcSet="./wednesday.webp" type="image/webp"/>
                                <source srcSet="./wednesday.png" type="image/png"/>
                                <img srcSet="./wednesday.png" className="typeIcon" alt="wednesday icon"/>
                            </picture>
                            <h2 className="parkingLotsText">Wednesday</h2>
                        </Link>
                    </div>
                    <div className="petTypeContainer">
                        <Link
                            to={`/buds?dayOfWeek=Thursday&arrival=${this.state ? this.state.arrival : ''}&earliest=${this.state ? this.state.earliest : ''}`}>
                            <picture>
                                <source srcSet="./thursday.webp" type="image/webp"/>
                                <source srcSet="./thursday.png" type="image/png"/>
                                <img srcSet="./thursday.png" className="typeIcon" alt="thursday icon"/>
                            </picture>
                            <h2 className="parkingLotsText">Thursday</h2>
                        </Link>
                    </div>
                    <div className="petTypeContainer">
                        <Link
                            to={`/buds?dayOfWeek=Friday&arrival=${this.state ? this.state.arrival : ''}&earliest=${this.state ? this.state.earliest : ''}`}>
                            <picture>
                                <source srcSet="./friday.webp" type="image/webp"/>
                                <source srcSet="./friday.png" type="image/png"/>
                                <img srcSet="./friday.png" className="typeIcon" alt="friday icon"/>
                            </picture>
                            <h2 className="parkingLotsText">Friday</h2>
                        </Link>
                    </div>
                </div>
        )
    }
}