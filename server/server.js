const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5001;

//make random = 0 if it doesnt reset
function makeRandom(min, max) {
  return Math.floor(Math.random()* max) + min;
}

let roundNum = 0;

//console.log(makeRandom(1, 25));

let randomNumber = makeRandom(1, 25);

console.log('the random number is:', randomNumber);

const guesses = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.json())

app.use(express.static('server/public'));

// GET & POST Routes go here
// Server sends guesses to the client
app.get('/guesses', (req, res) => {
  console.log('we got a get req');
  res.send(guesses);
})

// Server is getting the guesses from the client and updating the guesses array 
// with the new guesses
app.post('/guesses', (req, res) => {
  console.log('we got POST req');
  let newGuesses = req.body
  guesses.push(newGuesses)
  res.sendStatus(201)
  roundNum++
})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
