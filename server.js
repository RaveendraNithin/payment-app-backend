const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-demo');

let nameSchema = new mongoose.Schema({
    creditCardNumber: String,
    creditHolder: String,
    expirationDate: String,
    amount: Number,
    securityCode: String
});

let cardDetails = mongoose.model("Details", nameSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen('7200', function(params) {
    console.log('Listening to port 7200');
});

app.get('/', function(req, res) {
    res.send('Response for GET request');
});

app.post('/payment', function(req, res) {
    let myData = new cardDetails(req.body);
    myData.save()
        .then(item => {
            res.send("Card details saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});