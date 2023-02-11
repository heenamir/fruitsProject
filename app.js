const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a fruit name']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: "Taste Good"
});

// fruit.save();

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 7,
    review: "Better with salt"
});

pineapple.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Amy",
    age: 13,
    favouriteFruit: pineapple
});

person.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "Hydrating"
});

const orange = new Fruit({
    name: "Orange",
    rating: 9,
    review: "Love them"
});

// Fruit.insertMany([kiwi, orange], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Success");
//     }
// });

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
        mongoose.connection.close();
    }
})