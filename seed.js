const db = require("./server/db");

const {User, Day, Vehicle, ParkingSpot} = require("./server/db/models");


const users = [
    {
        "userId": 1,
        "email": "bbronco@cpp.edu",
        "password": "billy",
        "gender": "male",
        "accountType": "student",
        "salt": "",
        "parkingPreferences": ["Lot M"],
        "phoneNumber": "1234567890"
    },
    {
        "userId": 2,
        "email": "wkellogg@cpp.edu",
        "password": "william",
        "gender": "male",
        "accountType": "student",
        "salt": "",
        "parkingPreferences": ["Lot M"],
        "phoneNumber": "9087654321"
    }];

const days = [
    {
        "userId": 1,
        "dayOfWeek": "Monday",
        "arrival": "9 am",
        "departure": "2 pm"
    },
    {
        "userId": 1,
        "dayOfWeek": "Tuesday",
        "arrival": "12 pm",
        "departure": "5 pm"
    },
    {
        "userId": 2,
        "dayOfWeek": "Monday",
        "arrival": "2 pm",
        "departure": "7 pm"

    },
    {
        "userId": 2,
        "dayOfWeek": "Tuesday",
        "arrival": "5 pm",
        "departure": "8 pm"
    }
];

const vehicles = [
    {
        "vehicleId": 1,
        "ownerId": 1,
        "color": "black",
        "model": "ford",
        "make": "bronco",
        "year": 2012
    },
    {
        "vehicleId": 2,
        "ownerId": 2,
        "color": "red",
        "model": "mazda",
        "make": "idk",
        "year": 2018,
    }
];

const parkingSpots = [
    {
        "vehicleId": 1,
        "parkingLot": "Lot M",
        "school": "Cal Poly Pomona",
        "pindrop": "354C+53 Walnut, California"
    }];

const seed = async () => {
    seedUsers();
    await Promise.all([
            seedDays(),
            seedSpots(),
            seedVehicles()
        ]
    ).catch(err => {
        console.log("Error in Promise");
        console.log(err.stack);
    });
};

const seedUsers = () => users.map(user => User.create(user));
const seedDays = () => days.map(day => Day.create(day));
const seedVehicles = () => vehicles.map(vehicle => Vehicle.create(vehicle));
const seedSpots = () => parkingSpots.map(spot => ParkingSpot.create(spot));

const main = () => {
    console.log("Syncing db...");
    db.sync({force: true})
        .then(() => {
            console.log("Seeding database...");
            return seed();
        })
        .catch(err => {
            console.log("Error while seeding");
            console.log(err.stack);
        })
        .then(() => {
            db.close();
        });
};

main();