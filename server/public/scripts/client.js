function onReady() {
  console.log("JavaScript is loaded!")
}

let roundNum = 0;

// Function to get the guesses array from the server
function getGuesses(){
  axios({
    method: 'GET',
    url: '/guesses'
  }).then((response) => {
    let guesses = response.data;
    renderGuesses(guesses)
    console.log('this data is being rendered', guesses)}
    )
  }

// function connected to Submit button that puts the players' guesses into
// the guess array
function makeGuesses(event) {
  event.preventDefault();
  // Store everyone's guess in a variable
  let hannahGuess = document.getElementById('Hannah').value;
  let ryanGuess = document.getElementById('Ryan').value;
  let abubakarGuess = document.getElementById('Abubakar').value;
  let jacobGuess = document.getElementById('Jacob').value;
  
  let guesses =[hannahGuess, ryanGuess, abubakarGuess, jacobGuess]
    // {
    //   hannah: hannahGuess,
    //   ryan: ryanGuess,
    //   abu: abubakarGuess,
    //   jacob: jacobGuess
    // }
  
  console.log(guesses);
  // Send the new guesses to the server
  axios({
    method: 'POST',
    url: '/guesses',
    data: guesses
  }).then((response) => {
    console.log("does this work");
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
  // tableBody.innerHTML = '';
    roundNum++;
    // This will make it so only the current round guesses get put in the table
    tableBody.innerHTML +=
      `
      <tr>
        <td>${roundNum}</td>
        <td class='${guesses[4]}'>${guesses[0]}</td>
        <td class='${guesses[5]}'>${guesses[1]}</td>
        <td class='${guesses[6]}'>${guesses[2]}</td>
        <td class='${guesses[7]}'>${guesses[3]}</td>
      </tr>
      `
  let winner;
  if(guesses[4]==='correct') { winner = "Hannah"} 
  else if (guesses[5]==='correct'){winner = "Ryan"}
  else if (guesses[6]==='correct'){winner = "Abu"}  
  else if (guesses[7]==='correct'){winner = "Jacob"} 
   {""}

  if(guesses.includes('correct')){
    window.alert(`The winner is: ${winner}`)
    }
  }

  function resetButton() {
    
  }

onReady()