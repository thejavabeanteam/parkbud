import React from 'react';
import { Link } from 'react-router-dom';
import CurrentLocation from './CurrentLocation';

const ParkingLots = () => (
    <div className="container">
        <div className="allParkingLots">
            <div className="parkingLotContainer">
                <Link to="/users/ParkingStructure">
                    <picture>
                        <source srcSet="./dogSquare.webp" type="image/webp" />
                        <source srcSet="./dogSquare.png" type="image/png" />
                        <img srcSet="./dogSquare.png" className="typeIcon" alt="dog icon" />
                    </picture>
                    <h2 className="parkingLotsText">ParkingStructure</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/A">
                    <picture>
                        <source srcSet="./catSquare.webp" type="image/webp" />
                        <source srcSet="./catSquare.png" type="image/png" />
                        <img srcSet="./catSquare.png" className="typeIcon" alt="cat icon" />
                    </picture>
                    <h2 className="parkingLotsText">A</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/B">
                    <picture>
                        <source srcSet="./birdSquare.webp" type="image/webp" />
                        <source srcSet="./birdSquare.png" type="image/png" />
                        <img srcSet="./birdSquare.png" className="typeIcon" alt="bird icon" />
                    </picture>
                    <h2 className="parkingLotsText">B</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/E1">
                    <picture>
                        <source srcSet="./bunnySquare.webp" type="image/webp" />
                        <source srcSet="./bunnySquare.png" type="image/png" />
                        <img srcSet="./bunnySquare.png" className="typeIcon" alt="rabbit icon" />
                    </picture>
                    <h2 className="parkingLotsText">E1</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/E2">
                    <picture>
                        <source srcSet="./mouseSquare.webp" type="image/webp" />
                        <source srcSet="./mouseSquare.png" type="image/png" />
                        <img srcSet="./mouseSquare.png" className="typeIcon" alt="smallfurry icon" />
                    </picture>
                    <h2 className="parkingLotsText">E2</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/Overflow">
                    <picture>
                        <source srcSet="./reptileSquare.webp" type="image/webp" />
                        <source srcSet="./reptileSquare.png" type="image/png" />
                        <img srcSet="./reptileSquare.png" className="typeIcon" alt="reptile icon" />
                    </picture>
                    <h2 className="parkingLotsText">Overflow</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/ParkingStructure2">
                    <picture>
                        <source srcSet="./horseSquare.webp" type="image/webp" />
                        <source srcSet="./horseSquare.png" type="image/png" />
                        <img srcSet="./horseSquare.png" className="typeIcon" alt="horse icon" />
                    </picture>
                    <h2 className="parkingLotsText">ParkingStructure2</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/F1">
                    <picture>
                        <source srcSet="./pigSquare.webp" type="image/webp" />
                        <source srcSet="./pigSquare.png" type="image/png" />
                        <img srcSet="./pigSquare.png" className="typeIcon" alt="barnyard icon" />
                    </picture>
                    <h2 className="parkingLotsText">F1</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/F2">
                    <picture>
                        <source srcSet="./pigSquare.webp" type="image/webp" />
                        <source srcSet="./pigSquare.png" type="image/png" />
                        <img srcSet="./pigSquare.png" className="typeIcon" alt="barnyard icon" />
                    </picture>
                    <h2 className="parkingLotsText">F2</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/H">
                    <picture>
                        <source srcSet="./pigSquare.webp" type="image/webp" />
                        <source srcSet="./pigSquare.png" type="image/png" />
                        <img srcSet="./pigSquare.png" className="typeIcon" alt="barnyard icon" />
                    </picture>
                    <h2 className="parkingLotsText">H</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/I">
                    <picture>
                        <source srcSet="./pigSquare.webp" type="image/webp" />
                        <source srcSet="./pigSquare.png" type="image/png" />
                        <img srcSet="./pigSquare.png" className="typeIcon" alt="barnyard icon" />
                    </picture>
                    <h2 className="parkingLotsText">I</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/J">
                    <picture>
                        <source srcSet="./pigSquare.webp" type="image/webp" />
                        <source srcSet="./pigSquare.png" type="image/png" />
                        <img srcSet="./pigSquare.png" className="typeIcon" alt="barnyard icon" />
                    </picture>
                    <h2 className="parkingLotsText">J</h2>
                </Link>
            </div>
            <div className="parkingLotContainer">
                <Link to="/users/UnpavedOverflow">
                    <picture>
                        <source srcSet="./pigSquare.webp" type="image/webp" />
                        <source srcSet="./pigSquare.png" type="image/png" />
                        <img srcSet="./pigSquare.png" className="typeIcon" alt="barnyard icon" />
                    </picture>
                    <h2 className="parkingLotsText">UnpavedOverflow</h2>
                </Link>
            </div>
        </div>
        <CurrentLocation />
    </div>
);

export default ParkingLots;