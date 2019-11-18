const db = require("./server/db");

const {User, Day, Vehicle, ParkingSpot} = require("./server/db/models");


const users = [
    {
        "id": 1,
        "name": "Billy Bronco",
        "email": "bbronco@cpp.edu",
        "password": "billy",
        "gender": "male",
        "accountType": "student",
        "salt": "",
        "parkingPreferences": ["M"],
        "message": "I'm tired of riding my bike from Overflow!",
        "phoneNumber": "1234567890"
    },
    {
        "id": 2,
        "name": "William Kellogg",
        "email": "wkellogg@cpp.edu",
        "password": "william",
        "gender": "male",
        "accountType": "student",
        "salt": "",
        "parkingPreferences": ["M"],
        "message": "It takes me a while to walk to Lot M, so it'd be nice if I could get a lift to my car!",
        "phoneNumber": "9087654321"
    }];

const days = [
    {
        "userId": 1,
        "dayOfWeek": "Monday",
        "departure": "1700"
    },
    {
        "userId": 1,
        "dayOfWeek": "Tuesday",
        "departure": "1700"
    },
    {
        "userId": 2,
        "dayOfWeek": "Monday",
        "departure": "1400"
    },
    {
        "userId": 2,
        "dayOfWeek": "Tuesday",
        "departure": "2000"
    }
];

const vehicles = [
    {
        "userId": 1,
        "color": "black",
        "model": "ford",
        "make": "bronco",
        "year": 2012
    },
    {
        "userId": 2,
        "color": "red",
        "model": "mazda",
        "make": "idk",
        "year": 2018,
    }
];

const parkingSpots = [
    {
        "userId": 2,
        "parkingLot": "M",
        "school": "Cal Poly Pomona",
        "pindrop": "/api/user/vehicle/spot/?pindrop=354C%253%20Walnut%2C%20California"
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