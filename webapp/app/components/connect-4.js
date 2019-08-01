import Component from '@ember/component';
import Ember from 'ember';

/** Start of refactored code to implement a computer player */

/** deepClone function clones the state matrix. This function allows lots of copies of the state matrix which is essential as
the minimax algorithm creates the game tree meaning it has to hold all possible moves. */
function deepClone(state) {
  var new_state = [];
  for(var idx1 = 0; idx1 < state.length; idx1++) {
    new_state.push(state[idx1].slice(0));
  }
  return new_state;
}


/** Name of the function changed to check_game_winner. Originally inside the component as check_winner. The entire content of check_winner has been moved
into check_game_winner. As the new function is no longer inside the component, several lines needed to be commented out and replaced. */

/** check_game_winner function implements and checks for winning patterns within the gameboard.
Inside this function is:
* An array within an array for every possible winning pattern
* A pattern matching algorithm that:
  * Gets the current value of the patters first co-ordinates
  * Continue checking IF that value has a value, otherwise move on the the next pattern
  * Loop over all other co-ordinates in the pattern, if the 'winner' value is different to value at any of the other co-ordinates of the pattern, set winner to undefined
  * IF 'winner' is set to a value once all co-ordinates in the pattern have been checked, stop checking and set that value to the 'winner' property.

*/
function check_game_winner(state) {

  //Patters variable is an array of patterns with each pattern itself an array of x/y co-oridinates.
  //In order to create the pattern matching technique, every possible winning pattern had to be identified with the co-ordinates recorded.
  //Each individual array is a set of x/y co-ordinates. The first number in the array is x and the second, y. The co-ordinates represent one square obtained by a marker
  //in a winning pattern.
  var patterns = [
    //Start of Diagonal winning patterns top left to right ( \ )
    //1st column Diagonal
    [[0, 0], [1, 1], [2, 2], [3, 3]], //Works
    [[0, 1], [1, 2], [2, 3], [3, 4]], //Works
    [[0, 2], [1, 3], [2, 4], [3, 5]], //Works
    //2nd column Diagonal
    [[1, 0], [2, 1], [3, 2], [4, 3]], //Works
    [[1, 1], [2, 2], [3, 3], [4, 4]], //Works
    [[1, 2], [2, 3], [3, 4], [4, 5]], //Works
    //3rd column Diagonal
    [[2, 0], [3, 1], [4, 2], [5, 3]], //Works
    [[2, 1], [3, 2], [4, 3], [5, 4]], //Works
    [[2, 2], [3, 3], [4, 4], [5, 5]], //Works
    //4th column Diagonal
    [[3, 0], [4, 1], [5, 2], [6, 3]], //Works
    [[3, 1], [4, 2], [5, 3], [6, 4]], //Works
    [[3, 2], [4, 3], [5, 4], [6, 5]], //Works
    //Start of Diagonal winning patterns top right to left ( / )
    //7th column Diagonal
    [[6, 0], [5, 1], [4, 2], [3, 3]], //Works
    [[6, 1], [5, 2], [4, 3], [3, 4]], //Works
    [[6, 2], [5, 3], [4, 4], [3, 5]], //Works
    //6th column Diagonal
    [[5, 0], [4, 1], [3, 2], [2, 3]], //Works
    [[5, 1], [4, 2], [3, 3], [2, 4]], //Works
    [[5, 2], [4, 3], [3, 4], [2, 5]], //Works
    //5th column Diagonal
    [[4, 0], [3, 1], [2, 2], [1, 3]], //Works
    [[4, 1], [3, 2], [2, 3], [1, 4]], //Works
    [[4, 2], [3, 3], [2, 4], [1, 5]], //Works
    //4th column Diagonal
    [[3, 0], [2, 1], [1, 2], [0, 3]], //Works
    [[3, 1], [2, 2], [1, 3], [0, 4]], //Works
    [[3, 2], [2, 3], [1, 4], [0, 5]], //Works
    //End of Diagonal pattern matching.

    //Horizontal pattern, bottom up
    //1st column Horizontal
    [[0, 5], [1, 5], [2, 5], [3, 5]], //Works
    [[1, 5], [2, 5], [3, 5], [4, 5]], //Works
    [[2, 5], [3, 5], [4, 5], [5, 5]], //Works
    [[3, 5], [4, 5], [5, 5], [6, 5]], //Works
    //2nd column Horizontal
    [[0, 4], [1, 4], [2, 4], [3, 4]], //Works
    [[1, 4], [2, 4], [3, 4], [4, 4]], //Works
    [[2, 4], [3, 4], [4, 4], [5, 4]], //Works
    [[3, 4], [4, 4], [5, 4], [6, 4]], //Works
    //3rd column Horizontal
    [[0, 3], [1, 3], [2, 3], [3, 3]], //Works
    [[1, 3], [2, 3], [3, 3], [4, 3]], //Works
    [[2, 3], [3, 3], [4, 3], [5, 3]], //Works
    [[3, 3], [4, 3], [5, 3], [6, 3]], //Works
    //4th column Horizontal
    [[0, 2], [1, 2], [2, 2], [3, 2]], //Works
    [[1, 2], [2, 2], [3, 2], [4, 2]], //Works
    [[2, 2], [3, 2], [4, 2], [5, 2]], //Works
    [[3, 2], [4, 2], [5, 2], [6, 2]], //Works
    //5th column Horizontal
    [[0, 1], [1, 1], [2, 1], [3, 1]], //Works
    [[1, 1], [2, 1], [3, 1], [4, 1]], //Works
    [[2, 1], [3, 1], [4, 1], [5, 1]], //Works
    [[3, 1], [4, 1], [5, 1], [6, 1]], //Works
    //6th column Horizontal
    [[0, 0], [1, 0], [2, 0], [3, 0]], //Works
    [[1, 0], [2, 0], [3, 0], [4, 0]], //Works
    [[2, 0], [3, 0], [4, 0], [5, 0]], //Works
    [[3, 0], [4, 0], [5, 0], [6, 0]], //Works
    //End of Horizontal patterns

    //Vertical patterns, top down.
    //1st column Vertical
    [[0, 0], [0, 1], [0, 2], [0, 3]], //Works
    [[0, 1], [0, 2], [0, 3], [0, 4]], //Works
    [[0, 2], [0, 3], [0, 4], [0, 5]], //Works
    //2nd column Vertical
    [[1, 0], [1, 1], [1, 2], [1, 3]], //Works
    [[1, 1], [1, 2], [1, 3], [1, 4]], //Works
    [[1, 2], [1, 3], [1, 4], [1, 5]], //Works
    //3rd column Vertical
    [[2, 0], [2, 1], [2, 2], [2, 3]], //Works
    [[2, 1], [2, 2], [2, 3], [2, 4]], //Works
    [[2, 2], [2, 3], [2, 4], [2, 5]], //Works
    //4th column Vertical
    [[3, 0], [3, 1], [3, 2], [3, 3]], //Works
    [[3, 1], [3, 2], [3, 3], [3, 4]], //Works
    [[3, 2], [3, 3], [3, 4], [3, 5]], //Works
    //5th column Vertical
    [[4, 0], [4, 1], [4, 2], [4, 3]], //Works
    [[4, 1], [4, 2], [4, 3], [4, 4]], //Works
    [[4, 2], [4, 3], [4, 4], [4, 5]], //Works
    //6th column Vertical
    [[5, 0], [5, 1], [5, 2], [5, 3]], //Works
    [[5, 1], [5, 2], [5, 3], [5, 4]], //Works
    [[5, 2], [5, 3], [5, 4], [5, 5]], //Works
    //7th column Vertical
    [[6, 0], [6, 1], [6, 2], [6, 3]], //Works
    [[6, 1], [6, 2], [6, 3], [6, 4]], //Works
    [[6, 2], [6, 3], [6, 4], [6, 5]], //Works
    //End of pattern matching
  ];

  //Load the current game state
  // var state = this.get('state');
  //Loop over all winning patters (patterns.length)
  for(var pidx = 0; pidx < patterns.length; pidx++) {
    //Assign each pattern to the 'pattern' variable
    var pattern = patterns[pidx];
    //Get the states current value pattern at the patterns first co-orindates
    var winner = state[pattern[0][0]][pattern[0][1]];

    if(winner) {
      //Loop over all other co-ordinates starting at 'idx1'. If the winner value is different to the value at any other co-ordinates
      //of the pattern, set the winner to undefined.
      for(var idx = 1; idx < pattern.length; idx++ ) {
        if(winner != state[pattern[idx][0]][pattern[idx][1]]) {
          winner = undefined;
          break;
        }
      }
      //If after checking all other co-ordinates in the pattern, the winner is still set to a value, then set that value as the components
      //winner property and stop checking other patterns.
      if(winner) {
        return winner;
        //this.set('winner', winner)
        //break;
      }
    }
  }
  //Initial assumption of a draw
  var draw = true;
  //Loop over all squares in the state, check if any values are undefined.
  for(var x = 0; x <=6; x++) {
    for(var y = 0; y <=5; y++) {
      if(!state[x][y]) {
        return undefined;
        //draw = false;
        //break;
      }
    }
  }
  //After checking all the squares, set the draw value as the current value of the components 'draw' property.
  //this.set('draw', draw);
  return '';
}

/** Patterns defined in order to work with match_pattern_at function.
Each inner list defines one part of the pattern. The first pattern defines the type of match to test for ('p') as found in match_pattern_at.
The second and third elements define the X and Y direction move to apply.
It states that 'p' must be the current player, if that matches update the co-ordinates for the next element, X = x + 0 and Y = y + 1.
Postive numbers represent a move upwards or right, dependent on the axis.
Negative numbers represent a move downwards or left, dependent on the axis */
var patterns = [
  {
    //Vertical
    pattern: [['p', 0, 1], ['p', 0, 1], ['p', 0, 1], ['p']],
    score: 1000
  },
  {
    //Horizontal
    pattern: [['p', 1, 0], ['p', 1, 0], ['p', 1, 0], ['p']],
    score: 1000
  },
  {
    //Diagonal
    pattern: [['p', 1, 1], ['p', 1, 1], ['p', 1, 1], ['p']],
    score: 1000
  },
  {
    //Diagonal
    pattern: [['p', 1, -1], ['p', 1, -1], ['p', 1, -1], ['p']],
    score: 1000
  },
  {
    //Diagonal
    pattern: [['p', -1, 1], ['p', -1, 1], ['p', -1, 1], ['p']],
    score: 1000
  },
  {
    //Diagonal
    pattern: [['p', -1, -1], ['p', -1, -1], ['p', -1, -1], ['p']],
    score: 1000
  },
  {
    //Vertical
    pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
    score: 50
  },
  {
    //Horizontal
    pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
    score: 50
  },
  {
    //Diagonal
    pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
    score: 50
  },
  {
    //Diagonal
    pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
    score: 50
  },
  {
    //Diagonal
    pattern: [['p', -1, 1], ['p', -1, 1], ['p']],
    score: 50
  },
  {
    //Diagonal
    pattern: [['p', -1, -1], ['p', -1, -1], ['p']],
    score: 50
  },
];

/** match_pattern_at function created to test patterns (above) against the state */
function match_pattern_at(state, pattern, player, x, y) {
  //Check the x and y co-ordinates are the next co-ordinates to check the next pattern element against the state. Checking to see if they are still within
  //the limits of the state (0)
  if(x >= 0 && x < state.length) {
    if(y >= 0 && y < state[x].length) {
      //Get the first element out of the pattern
      var element = pattern[0];
      //Check to see type part of the element is 'p', meaning it expects the state[x][y] to be the current players marker.
      if(element[0] == 'p') {
        //If it is not, the current pattern does not match.
        if(state[x][y] !== player) {
          return false;
        }
      }
      //Check to see if the type is '' (empty square).
      else if(element[0] == ' ') {
        //If the square is not empty, the pattern does not match.
        if(state[x][y] !== undefined) {
          return false;
        }
      }
      //Check to see if the pattern has more than one element in it.
      if(pattern.length > 1) {
        //If it does then all elements of the pattern have not been matched. Recursively call match_pattern_at with the remainder
        //of the pattern (pattern.slice(1)) and the x and y co-ordinates updated with the values of the pattern elements second and third parameter.
        return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2])
      }
      //If there is only one element in the pattern, then the pattern has matched and return true.
      else {
        return true;
      }
    }
  }
  //Return false if either x or y co-ordinates are outside the state.
  return false;
}

/** In developing the heuristic, match_pattern was created. match_pattern checks if the given pattern matches anywhere in the current state for the given player. */
function match_pattern(state, pattern, player) {
  //Loop over all squares in the state
  for(var idx1 = 0; idx1 < state.length; idx1++) {
    for(var idx2 = 0; idx2 < state[idx1].length; idx2++) {
      //Uses match_pattern_at function to see if the pattern matches for the player at the co-ordinates (idx1(x) and idx2(y))
      var matches = match_pattern_at(state, pattern, player, idx1, idx2);
      if(matches) {
        return true;
      }
    }
  }
  return false;
}

/** heuristic funtion added to provide moves with an heuristic to score moves.
The aim of this function is to take into account the strength of both players.
The approach in each 'if' statements allows a calculation of the final score, balancing how good the position is for the computer and how good it is for the human.
A score above 0 indicates a state that benefits the computer whilst a score below indicates a state benefitting the user.*/
function heuristic(state) {
  var score = 0;
  //Loop over the list of patterns (above) and call the match function to test if the pattern matches for that player.
  for(var idx = 0; idx < patterns.length; idx++) {
    //If it matches the computer player, the pattern score is added to the score.
    if(match_pattern(state, patterns[idx].pattern, 'Yellow')) {
      score = score + patterns[idx].score;
    }
    //If it matches the user player, the pattern score is subtracted from the score.
    if(match_pattern(state, patterns[idx].pattern, 'Red')) {
      score = score - patterns[idx].score;
    }
  }
  return score;
}

/** minimax function takes three parameters: current game 'state', search depth 'limit' and the 'player' to play next.
This function is recursive and the limit is used to define the maximum search depth. */
function minimax(state, limit, player) {
  var moves = [];
  if(limit > 0) {
    //Loop over the state matrix checking if the squares are undefined (empty).
    //Values set to the gameboard columns, 7x6.
    for(var idx1 = 0; idx1 < 7; idx1++) {
      for(var idx2 = 0; idx2 < 6; idx2++) {
        //If the square is empty create a new object representing a potential move.
        if(state[idx1][idx2] === undefined) {
          //Added to code to ensure the computers markers drop to the bottom of the column. The same principle as
          //what can be found in 'click' function ensuring the users marker drops to the bottom of the column.
          idx2 = 5;
          while(state[idx1][idx2]) {
            idx2 = idx2 - 1;
          }
          if(idx2 >= 0) {
            var move = {
              x: idx1,
              y: idx2,
              //When a potential move is generated, use the deepClone function to also store the state after this move.
              state: deepClone(state),
              score: 0
            };
            move.state[idx1][idx2] = player;
            //Check to see if the game is at a leaf in the game tree or at an internal node. The distinction is made by first checking to see if the 'limit' is 1 or if the game has been won.
            if(limit === 1 || check_game_winner(move.state) !== undefined) {
              //Updated upon creation of heuristic function. Calls the function instead of the previous hard-coded heuristic based on game winner.
              move.score = heuristic(move.state);
            }
            // Handling of the internal node case.
            else {
              //Recursively calculate all moves and call the minimax function with the updated move.state, the 'limit' reduced by 1 and the players switched.
              //Assign list of all posible moves to move.moves.
              //It's important to remember that moves are given a score!
              move.moves = minimax(move.state, limit - 1, player == 'Red' ? 'Yellow' : 'Red');
              var score = undefined;
              //Loop over all of the move.moves handling one of three cases:
              for(var idx3 = 0; idx3 < move.moves.length; idx3++) {
                //Meaning this is the current move and assign the 'score' the moves score.
                if(score === undefined) {
                  score = move.moves[idx3].score;
                }
                //The current player is 'Red' (user), calculate the score as the max of the score and that potential moves score.
                else if(player === 'Red') {
                  score = Math.max(score, move.moves[idx3].score);
                }
                //The current player is 'Yellow' (computer), calculate the score as the max of the score and that potential moves score.
                else if(player === 'Yellow') {
                  score = Math.min(score, move.moves[idx3].score);
                }
              }
              move.score = score;
            }
            moves.push(move);
          }
        }
      }
    }
  }
  return moves;
}

/**computer_move adapted to include the 'minimax' algorithm. The complex move calculation has moved to the minimax function.
Now, computer_move calls the minimax function with two parameters: 'state' - the initial game state as to where to start searching. '2' - the maximum search depth - one move for the computer and one move for the human.
'Yellow' - The computer player is to go first in the heuristic. */
function computer_move(state) {
  var moves = minimax(state, 4, 'Yellow');
  var max_score = undefined;
  var move = undefined;
  //Loop over list of potential moves picking the one with the highest score.
  for(var idx = 0; idx < moves.length; idx++) {
    if(max_score === undefined || moves[idx].score > max_score) {
      createjs.Sound.play('computer-click');
      //Assign move to the object
      max_score = moves[idx].score;
      move = {
        x: moves[idx].x,
        y: moves[idx].y

      }
    }
  }
  //Move returned by the function
  return move;
}

//Start of component functions
export default Component.extend({

  desktop: true,
  playing: false,
  winner: undefined,
  draw: false,

  //Loading sound into the game and plugins for the application.
  init: function() {
    this._super(...arguments);
    createjs.Sound.registerSound("assets/sounds/click.wav", "computer-click");
    createjs.Sound.registerSound("assets/sounds/falling.mp3", "falling");
    createjs.Sound.registerSound("assets/sounds/winner.wav", "winner");
    createjs.Sound.registerSound("assets/sounds/lose.wav", "lose");
    createjs.Sound.registerSound("assets/sounds/wet-click.wav", "player-click");

    //Added to allow the desktop and mobile application to display different instructions.
    var component = this;
    document.addEventListener("deviceready", function() {
      if(shake) {
        shake.startWatch(function() {
          component.send('start');
        });
      }
      component.set('desktop', false);
    }, false);
  },

  /** didInsertElement initalises graphic handling by being called once Ember has inserted the components HTML into the browsers DOM.
  Inside this function is:
  * The code to access the jQuery object, returning HTML element
  * Access graphics property
  * All the code to draw the gameboard
  * Add the board to the Stage
  * All the code to draw two set of markers, Red and Yellow
  */
  // Event called after Ember has inserted components into the browsers DOM.
  didInsertElement: function() {
    //this.$ accesses the jQuery object, returning the HTML element containing the components template.
    //Accessing our created canvas, [0] selects just the DOM element from the jQuery object.
    var stage = new createjs.Stage(this.$('#stage')[0]);
    //In EaselJS, all drawings are created using createjs.Shape.
    var board = new createjs.Shape();
    //First is to access the graphics property which is assigned to variable 'graphics'.
    var graphics = board.graphics;
    //Set the colour of the board lines
    graphics.beginFill('#353839');
    //Draws the game board taking four parameters. The first two are x and y co-ordinates definining the left, upper corner of the rectangle.
    //The third is the width of the rectangle, and the fourth is the height.
    //Draw gameboard outer shell
    graphics.drawRect(0, 0, 350, 2);
    graphics.drawRect(350, 0, 2, 300);
    graphics.drawRect(0, 0, 2, 300);
    graphics.drawRect(0, 300, 352, 2);
    //Draw vertical lines
    //Only six lines drawn as the outer box has already been drawn. Each squares positon increments by 50 pixels , 300 pixels divided by 6 = 50 pixels.
    graphics.drawRect(50, 0, 2, 300);
    graphics.drawRect(100, 0, 2, 300);
    graphics.drawRect(150, 0, 2, 300);
    graphics.drawRect(200, 0, 2, 300);
    graphics.drawRect(250, 0, 2, 300);
    graphics.drawRect(300, 0, 2, 300);
    //Draw horizontal lines
    //Only five lines drawn as the outer box has already been drawn. Each squares positon increments by 50 pixels for an even square
    graphics.drawRect(0, 50, 350, 2);
    graphics.drawRect(0, 100, 350, 2);
    graphics.drawRect(0, 150, 350, 2);
    graphics.drawRect(0, 200, 350, 2);
    graphics.drawRect(0, 250, 350, 2);
    //x co=ordinate set to 15 to centre the board in the middle. 380 (canvas) - 350 (board width) / 2 (L and R gutters) = 15.
    //y co-ordinate set to 40 to provide some space between the board and the header.
    board.x = 15;
    board.y = 40;
    //Set the boards opacity to 0 for fade in animation
    board.alpha = 0;
    this.set('board', board);
    //Adds the board onto the stage, ready to be drawn.
    stage.addChild(board);
    //Creating the markers
    //Object created to hold the r(red) and y (yellow) players.
    var markers = {
      'Red':[],
      'Yellow':[]
    }
    //As the board has 42 slots, the most a player will need is 21 markers
    for (var x = 0; x < 21; x++) {
      // Creating the red circular marker
      var redMarker = new createjs.Shape();
      graphics = redMarker.graphics;
      //Set he colour of the shape
      graphics.beginFill('#ef3c42');
      graphics.setStrokeStyle(10);
      //First two parameters are the x and y co-ordinates, the last parameter is the radius
      graphics.drawCircle(0, 0, 23);
      graphics.endFill();
      redMarker.visible = false;
      //Add circle to the stage
      stage.addChild(redMarker);
      //Add r to the markers list above
      markers.Red.push(redMarker);

      //create the yellow circular marker
      var yellowMarker = new createjs.Shape();
      graphics = yellowMarker.graphics;
      //Set he colour of the shape
      graphics.beginFill('#fecc0c');
      //First two parameters are the x and y co-ordinates, the last parameter is the radius
      graphics.drawCircle(0, 0, 23);
      graphics.endFill();
      yellowMarker.visible = false;
      //Add circle to the stage
      stage.addChild(yellowMarker);
      //Add y to the markers list above
      markers.Yellow.push(yellowMarker);
    }
    //Store markers and the stage in the components state allowing the user to click (click function below)
    this.set('markers', markers);
    this.set('stage', stage);

    //Event listener used to register an event for every tick.
    createjs.Ticker.addEventListener("tick", stage);
  },

  //Added to ensure the mobile device can be played or restarted by shaking the device.
  willDestroyElement:function() {
    this._super(...arguments);
    if(shake) {
      shake.stopWatch();
    }
  },

  /** Click function handles all the clicks for the game but only if the game is playing and there is no winner
  Inside this function is:
  * The code to restrict click events to the board.
  * Determine the cell values
  * Additional code implemented to ensure that markers drop to the bottom of the column
  * Update the state, indicating a location has a marker
  * Update the markers co-ordinates enuring the markers are positioned nicely inside the board squares
  * Check for any winners
  * Update the game state and move counts.
  * The next player is then set to play and the stage is updated ensuring the marker is shown on the board.
  */

  /** Click function updated for incorporation of the computer player.
    * var component = this;
    * All uses of 'this' replaced with component
    * Replace all uses of player with 'Red' as the only human player (Red) will only ever use the click method
    * Addition of the computer player wrapped inside a setTimeout function
  */
  click:function(ev) {
    var component = this;
    //Clicks are only handled if the game has been started and has not yet been won.
    if(component.get('playing') && !component.get('winner')) {
      //Restrict the click events to board.
      //ev parameter is the original browser click event with properties target.tagName, offsetX and offsetY.
      //Firstly, the canvas element is checked to see if this has been clicked on.
      //The second and third properties specify the x and y offset between the location clicked on and top left corner of the HTML element (canvas).
      //Clicks are only handled if they are greater than 20 and 40 and less than 360 and 340.
      if(ev.target.tagName.toLowerCase() == 'canvas' && ev.offsetX >= 20 && ev.offsetY >= 40 &&
    ev.offsetX < 360 && ev.offsetY < 340) {

      //To determine the cell, the values above are subtracted from specified width of a column, 50px
      var x = Math.floor((ev.offsetX - 20) / 50);
      var y = Math.floor((ev.offsetY - 40) / 50);
      //Check to see if a marker has already been placed by loading the state from the component.
      var state = component.get('state');

      //Start of additional code added to allow the markers to drop to the bottom of the column clicked.
      //Co-ordinate y has its value set to 5. Y is the vertical axis with six squares per column. Numbered from top down as: 0, 1, 2, 3, 4, 5.
      //The value is set to five as this represents the bottom square in a column.
      var y = 5;
      //Added while statement delcaring that while the value of x and y co-ordinates are true, decrement y by 1.
      while (state[x][y]){
          y = y - 1;
        }
      //Check if the value at the x and y co-ordinats is false
      //Additional code added to if statement to ensure the marker cannot be placed outside of the column
      //Now it reads: If the value of x,y co-ordinates is false AND the value of co-ordinate y is greater than or equal to 0.
      //Effectively ensuring that the markers cannot be placed inside a column when it's full, or on top of an existing marker.
      if(!state[x][y] & y >= 0) {
        createjs.Sound.play('player-click');
        //Get the current player
        //var player = this.get('player');
        //Set the state at the current x and y co-ordinates to the player, indicating the player has played in that location.
        state[x][y] = 'Red';
        //Load move-count from the component, indicating how many moves the players has previously played.
        var move_count = component.get('moves')['Red'];
        //Value above used to get the next marker to be placed from the 'markers' object inside the didInsertElement.
        var marker = component.get('markers')['Red'][move_count];
        //Marker set to visible
        marker.visible = true;
        //Update markers co-ordinates
        marker.x = 41 + x * 50;
        marker.y = 66 + y * 50;
        component.check_winner();
        //Update the game state and move counts. This guarantees that the next marker played will be chosen from the array
        //of markers inside 'didInsertElement'.
        //The next player is then set to play and the stage is updated ensuring the marker is shown on the board.
        component.get('moves')['Red'] = move_count + 1;

        /** Added function for the computer player - wrapped inside a setTimeout function to give the illusion of the
        computer thinking. Firstly, check to see if the user has not won or that it is a draw.
        IF the game is still playing, use the computer_move function (outside the component), to determine where the computer will play.
        Importantly, the computer_move function takes the current state, returning the 'state' object with x and y properties, definining where the computer wants to play.
        The remainder of the function is the same as 'Red' (user) player.
        */
        setTimeout(function() {
          if(!component.get('winner') && !component.get('draw')) {
            var move = computer_move(state);
            move_count = component.get('moves')['Yellow'];
            state[move.x][move.y] = 'Yellow';
            marker = component.get('markers')['Yellow'][move_count];
            marker.visible = true;
            marker.x = 41 + move.x * 50;
            marker.y = 66 + move.y * 50;
            component.get('moves')['Yellow'] = move_count + 1;
            component.get('stage').update();
            component.check_winner();
          }
        }, 600);

        }
      }
    }
  },

  /** check_winner has been heavily changed in order to implement a computer player. The entire content has been moved to check_game_winner.
   Now the components check_winner function works with the generic function for check the games winning state (check_game_winner)
   */
  check_winner:function() {
    //Get the current game state from the Component
    var state = this.get('state');
    //Call the check_game_winner function with said state
    var winner = check_game_winner(state);
    //Dependent on the return value of the function, 'winner' or 'draw' is set as the properties of the component
    if(winner !== undefined) {
      if(winner === '') {
        this.set('draw', true);
      } else {
        this.set('winner', winner);
        //Created if statement ensuring different sounds will be played based on the outcome of the game.
        if(winner === 'Red') {
          createjs.Sound.play('winner');
        } else {
          createjs.Sound.play('lose');
        }

      }
    }
  },

  /** Handling of all new actions. The start action initalises the games state.
  Inside this function is:
  * Boardgame animation
  * Check to see if the game is playing
  * Specify the current game state is stored in the 'state' property, consisting of an outer array with seven nested arrays.
  * Initialises the number of moves made
  */
  actions: {
    //Initialises the games state.
    start:function() {
      //Setting the boards animation.
      var board = this.get('board');
      //Re-setting the boards alpha to 0 for game re-start
      board.alpha = 0;
      //Beginning the animation process.
      //Use Tween objects get function to create a new animation. 'board' is tha get parameter to be animated.
      //createjs.Tween.get(board).to({alpha:1}, 1000);

      //Check to see if the game is playing
      if(this.get('playing')) {
        var markers = this.get('markers');
        for(var idx = 0; idx < 21; idx++) {
          createjs.Tween.get(markers.Red[idx]).to({y: 600}, 500);
          createjs.Tween.get(markers.Yellow[idx]).to({y: 600}, 500);
        }
        createjs.Sound.play("falling");
        createjs.Tween.get(board).wait(500).to({alpha: 1}, 1000);
      }
      //If no game is playing, the board will fade in.
      else {
        createjs.Tween.get(board).to({alpha: 1}, 1000);
      }
      this.set('playing', true);
      this.set('winner', undefined);
      this.set('draw', undefined);
      //Game state is stored in 'state' property, containing an outer array with three nested arrays.
      //Each inner array contains three items (undefined). Each item represents a column on the board and by
      //using undefined it specifies that no player has played in that slot.
      this.set('state', [
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined]]);
      //Initialises the number of moves each player has made so far.
      this.set('moves', {'Red':0, 'Yellow':0});
      //Specifies that r goes first.
      this.set('player', 'Red');

      var markers = this.get('markers');
      this.get('stage').update();
    }
  }
});
