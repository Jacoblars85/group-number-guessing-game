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

let guesses = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.json())

app.use(express.static('server/public'));

// GET & POST Routes go here
// Server sends guesses to the client
app.get('/guesses', (req, res) => {
  console.log('we got a get req', roundNum);
  console.log("Guesses at req:", guesses);
  res.send(guesses[roundNum-1]);
})

// Server is getting the guesses from the client and updating the guesses array 
// with the new guesses
app.post('/guesses', (req, res) => {
  console.log('we got POST req');
  let newGuesses = req.body
  console.log(newGuesses);
  console.log(randomNumber);
  for(let i=0; i<4; i++){
    if(newGuesses[i] < randomNumber){
      newGuesses.push('too-low');
    } else if(newGuesses[i] > randomNumber){
      newGuesses.push('too-high');
    } else {
      newGuesses.push('correct');
    }
  }
  guesses.push(newGuesses)
  res.sendStatus(201)
  console.log(newGuesses);
  roundNum++
})

app.post('/clear', (req, res) => {
  console.log('we got POST req');
  let clearValues = req.body
  if (clearValues) {
    guesses = []
    randomNumber = makeRandom(1, 25)
    roundNum = 0;
    console.log('we cleared', randomNumber);
  }
  res.sendStatus(201)

})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
