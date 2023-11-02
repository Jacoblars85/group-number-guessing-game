function onReady() {
  console.log("JavaScript is loaded!")
}

// Function to get the guesses array from the server
function getGuesses(){
  axios({
    method: 'GET',
    url: '/guesses'
  }).then((response) => {
    let guesses = response.data;
    renderGuesses(guesses);
  })
}

// function connected to Submit button that puts the players' guesses into
// the guess array
function makeGuesses(event) {
  event.preventDefault();
  let guesses = [];
  // Store everyone's guess in a variable
  let hannahGuess = document.getElementById('Hannah').value;
  let ryanGuess = document.getElementById('Ryan').value;
  let abubakarGuess = document.getElementById('Abubakar').value;
  let jacobGuess = document.getElementById('Jacob').value;
  
  guesses.push([
    {
      name: 'Hannah',
      number: hannahGuess
    },
    {
      name: 'Ryan',
      number: ryanGuess
    },
    {
      name: 'Abubakar',
      number: abubakarGuess
    },
    {
      name: 'Jacob',
      number: jacobGuess
    }
  ])
  // Send the new guesses to the server
  axios({
    method: 'POST',
    url: '/guesses',
    data: guesses
  }).then((response) => {
    getGuesses();
  })
  
  // Clear fields
  document.getElementById('Hannah').value = '';
  document.getElementById('Ryan').value = '';
  document.getElementById('Abubakar').value = '';
  document.getElementById('Jacob').value = '';

  // Clear the guesses array 
  guesses = [];
}

function renderGuesses(guesses){
  // Make a variable for the table body
  let tableBody = document.getElementById('roundTable');
  tableBody.innerHTML = '';
  let roundNum = guesses.length/4;
  for(let guess of guesses){
    // This will make it so only the current round guesses get put in the table
    
    if(guess.round === roundNum){
      tableBody.innerHTML += 
      `
      <tr>
        <td>${roundNum}</td>
        
      </tr>
      `
    }
  }
}

onReady()