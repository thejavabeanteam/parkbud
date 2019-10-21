const db = require("./server/db");
const User = require("./server/db/models"); // change filepath once user.js is created


const user = [{
    "email": "bbronco@cpp.edu",
    "password": "billy",
    "salt": ""
}];

const seed = () =>
    Promise.all(user.map(user => user != null)
        // eventually we'll map the user object we created above to our ORM instead of checking that it's not null
        // User.create(user)
    )
        .catch(err => {
            console.log("Error in Promise");
            console.log(err.stack);
        });





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