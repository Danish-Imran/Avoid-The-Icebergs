/*
  Name:        Game: Avoid Icebergs
  Purpose:     Assignment to demonstrate my knowledge of arrays, functions, and loops. 

  Author:      Danish I.
  Created:     May 17, 2023
  Updated:     May 26, 2023
*/

//This is required to get input from the user in the console.
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');

let worldMap = [ // 2D Array that keeps track of the water, checkmark, boat, and relative positions
    ['🚣','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [0][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [1][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [2][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [3][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [4][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [5][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','🌊'], // [6][0,1,2,3,4,5,6,7]
    ['🌊','🌊','🌊','🌊','🌊','🌊','🌊','☑️']  // [7][0,1,2,3,4,5,6,7]
  ]

// define variables

let row = ""
let boatX = 0 // keeps track of boat's position in the array
let boatY = 0

let netMove = 0 // used to view where the boat is moving
let gameEnd = "" // result of game
let movesMade = [] // keeps track of every player moves for the end

/** 
  * Logs the individual contents of the array in an 8x8 grid, without the quotes and square brackets. This code is repeated for every move, so it is a function for simplification.
  *
  *
  */
function printMap() {
  for (array of worldMap) { 
    for (emoji of array) {
      row += emoji // logs each row at a time
    }
    console.log(color(row, 'bgWhite')) // white bg for visibility
    row = "" // resets variable for next row
  }
}

/**
  * Takes the player's move and alters the array in the necessary way. It replaces the boat with where it it supposed to go, adds water where the boat used to be, and detects if it is out of bounds or in contact with an iceberg.
  *
  * @param {string} move - The direction (move) the player decided to make
  *
  * @returns {string} Updates the program on whether the game is lost, won, or continues. If it is lost or won, then the program will stop after printing a game status message. Else, nothing is returned and it continues regularly.
  *
  */
function makeMove(move) {
  netMove = 0
  if (move.toUpperCase() == "D") {
    movesMade.push(" Down")
    netMove = boatY + 1
    if (netMove == 8) {
      return gameEnd = "lose"
    }
    else {
      if (worldMap[netMove][boatX] != "🧊" && boatY != 7) { // if move is safe
        worldMap[boatY].splice(boatX, 1, "🌊"); // replaces behind with water
        worldMap[netMove].splice(boatX, 1, "🚣"); // places boat in new area
    }
      else { // if player lost game
        return gameEnd = "lose"
    }
    boatY += 1 // keeps track of boat's position 
    }
  }

  else if (move.toUpperCase() == "R") {
    movesMade.push(" Right")
    netMove = boatX + 1
    if (worldMap[boatY][netMove] != "🧊" && boatX != 7) {
      worldMap[boatY].splice(boatX, 1, "🌊")
      worldMap[boatY].splice(netMove, 1, "🚣")
    }
    else {
      return gameEnd = "lose"
    }
    boatX += 1
  }
  
  
  else if (move.toUpperCase() == "U") {
    movesMade.push(" Up")
    netMove = boatY - 1
    if (netMove == -1) {
      return gameEnd = "lose"
    }
    else {
      if (worldMap[netMove][boatX] != "🧊" && boatY != 0) {
      worldMap[boatY].splice(boatX, 1, "🌊");
      worldMap[netMove].splice(boatX, 1, "🚣");
    }
    else { 
      return gameEnd = "lose"
    }
    boatY -= 1 
    }
  }

  
  else if (move.toUpperCase() == "L") {
    movesMade.push(" Left")
    netMove = boatX - 1
    if (worldMap[boatY][netMove] != "🧊" && boatX != 0) {
      worldMap[boatY].splice(boatX, 1, "🌊")
      worldMap[boatY].splice(netMove, 1, "🚣")
    }
    else {
      return gameEnd = "lose"
    }
    boatX -= 1
    }

  
  if (boatX == 7 && boatY == 7) { // detection for reaching the checkmark
    return gameEnd = "win"
  }
}

// Add icebergs; generate map

for (array of worldMap) {
  for (emoji in array) { // executes for each water emoji in the row
    chanceRemoval = Math.random()
    if (chanceRemoval <= 0.200 && array[emoji] != "🚣" && array[emoji] != "☑️") { // 20% chance to replace water with iceberg (the ice emoji); iceberg must not replace boat or checkmark
      array.splice(emoji, 1, "🧊")
    }
  }
}

// introduce game and map

console.log(color('Welcome to: Avoid the Icebergs!', 'black'))
console.log(color('🚣 <-- That is you; a boat. You must reach the checkmark ☑️  in the bottom right.', 'black'))
console.log(color('You can only travel up, down, left, and right. Also, you can only move in the water 🌊.\nIf you hit an iceberg 🧊, or go out of bounds, you lose! \n', 'black'))

printMap()

// Begin game loop, make moves

while (gameEnd == "") {
  playerMove = prompt("Would you like to move: [U]p, [D]own, [L]eft, or [R]ight? ")
  
  if ((playerMove.toUpperCase() != "U" && playerMove.toUpperCase() != "D" && playerMove.toUpperCase() != "L" && playerMove.toUpperCase() != "R")) { // checks for valid input and type
    console.log(color('Please enter a valid input! Must be either U, D, L, or R.', 'red'));
  }
  else {
    console.clear() // clears old map before updating
    makeMove(playerMove)
    printMap()
  }
}

// game results

if (gameEnd == "win") {
  console.log(color('You win!', 'green'));;
  console.log("The moves you made were:" + movesMade + ".")
}
else { // if player lost
  console.log(color('You lose', 'red'));
  console.log("The move that made you lose was:" + movesMade.pop() + ". You sank like the titanic.")
}
