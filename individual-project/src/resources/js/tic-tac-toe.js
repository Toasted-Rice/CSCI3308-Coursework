/**
 * @overview [IMPORTANT]
 *
 * You are free to create any number of helper function you want.
 * We know the problem could be searched online, and we are aware of those
 * solutions. So please sight sources if you took help from any online resource.
 */

/**
 * @var {object} table_ids IDs for all the table elements.
 * @var {object} player_ids IDs for both player name input boxes
 *
 * You get the cell element just by using document.getElementById("A1")
 */
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
/**
 * @var {object} board_state An array to store the state to the tictactoe board.
 *
 * An integer array of length 9 that represents the tic tac toe board.
 * When a move is made (Example player 1 (who is X) move at Cell 'A1' --- The
 * board_state[0] will be made 1 )
 * Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2]
 * will be made 0 )
 * We store the move of player 1 as '1' and player 2 as '0'. So after the above
 * two moves the state should look like
 * [1, -1, 0, -1, -1, -1, -1, -1, -1]
 */
var board_state = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

/**
 * @var {bool} started A flag to keep track of the status of the game
 *
 * false means the game is not started. The default value is set to false
 */
var started = false;

/**
 * @var {number} turn A variable to keep track of each players turn. Since the
 * game always starts with player 1 - The default value is set to `1`
 * 1 means player_1
 * 0 means player_2
 */
var turn = 1;

/**
 * A method for checking if a string is empty
 *
 * @param {string} _str - Note the type is not checked in the implementation
 * @returns {boolean} The methods returns true is the _str is null or it has a
 * length of 0, otherwise, the methods returns false
 */
function isEmpty(_str) {
  return !_str || 0 === _str.length;
}

/**
 *
 * @returns {int} This returns the turn variable. Please note that
 * turn = 1 is for player_1 and
 * turn = 0 is for player_2
 */
function whose_move() {
  return this.turn;
}

/**
 * This methods toggles the 'turn' variable.
 *
 * if the turn is set to 1 it will make it 0
 * if the turn is set to 0 it will make it 1
 */
function toggle_move() {
  this.turn = !this.turn;
}

/**
 * @func game_started Gets the value of the 'started' flag.
 *
 * The method returns the value of the 'started' flag. When the game has not
 * started the flag is set to false. As soon as the game
 * starts the flag must be set to true. Once the game has finished or user has
 * clicked on reset_play the flag must be set to false.
 *
 * @returns {boolean} The value of the started flag
 * true means the game has started
 * false means the game has not started
 */
function game_started() {
  return this.started;
}

/**
 * @func begin_play
 * @todo Rule 1: This is the first method you'll implement.
 * This method is called when the Begin Play button is clicked.
 *
 * The method should do all the validations as stated in rule 1.
 * 1. Verify if the player names are empty or not. Raise an alert if they are
 *    empty.
 * 2. If the field are empty don't start the game. This just means the function
 *    will return and do nothing. The 'started' flag will not be modified.
 * 3. If all verification is successful, disable the name fields and update the
 *    player moves as shown in the image.
 * 4. If all verification is successful, update the turn information on the
 *    page. (See the source code and image). And set the started flag to true.
 *    (this will help you track at any instant if the game is in start state or
 *    not.)
 * 5. Once game has started, Handle multiple clicks on begin play.
 */
function begin_play() {
  if (started)
  {
    alert("Already started. Please Reset Play to start again.")
    return
  }

  var player_ids = [document.getElementById("player1_id"), document.getElementById("player2_id")]

  if (player_ids.some( (player) => isEmpty(player.value) )) {
    alert("Two player game, both the fields are mandatory.")
    alert("The game has not started.")
    return
  }

  var moveTypes = turn ? ["X","O"] : ["O","X"]
  for (var i=0; i<2; i++)
  {
    player_ids[i].disabled = true
    player_ids[i].value = player_ids[i].value + " (" + moveTypes[i] + ")"
  }
  document.getElementById("turn_info").innerHTML = "Turn for : <b>X</b>"
  started = true;
}

/**
 * @func reset_play
 * @todo - Rule 2: This is the second method you'll implement.
 * This method is called when the Reset Play button is clicked.
 *
 * The method should do all the things as stated in rule 2.
 * 1. The reset play button should reset the whole game.(At any time when reset
 *    is clicked - All the three text boxes should be cleared and Turn should
 *    be set to the default message.)
 * 2. The text boxes for entering name should be enabled back.
 * 3. The Tic Tac Toe Grid should be set to its default entries.
 * 4. Clicking reset play again and again shall have the same effect.(or no
 *    effect when clicked multiple times). Remember to set the started flag as
 *    false
 */
function reset_play() {
  input_boxes = [
    document.getElementById("player1_id"),
    document.getElementById("player2_id"),
    document.getElementById("move_text_id")
  ]

  for (cell_id of table_ids) {
    let cell = document.getElementById(cell_id)
	cell.innerHTML = cell_id
	cell.style.color = "yellowgreen";
	cell.style.fontWeight = "500";
  }
  for (element of input_boxes)
  {
    element.value = ""
    element.disabled = false;
  }
  document.getElementById("turn_info").innerHTML = "Game has not begun."
  turn = 1
  board_state = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  started = false
}

/**
 * @func play
 * @todo - Rule 3: This is the last method you'll implement.
 * This method is called every time a move has been player( Play button was
 * clicked).
 *
 * The method should do all the things as stated in rule 2.
 * 1. The moves should be validated can only be these ["A1", "A2", "A3", "B1",
 *    "B2", "B3", "C1", "C2", "C3"]
 * 2. Invalid moves should be reported by an alert message.(You are encouraged
 *    to use Modal which you learned in HW1 - Usage is not mandatory.)
 * 3. If the move is a valid move, the grid should be updated with the correct
 *    move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not
 *    zero!)) - The turn information should also be updated
 *    HINT: Use the turn variable to figure out who is currently playing. Use
 *    to toggle method to change moves.
 * 4. A move should always be a valid move. (Example: If say a move was made in
 *    already filled cell, it should be invalidated with an alert.)
 * 5. If the game has not started, clicking on <b>Play</b> should give an alert
 *    "The game has not started."
 * 6. After any move, the state of the table should be validated.(see the
 *    document attached in the homework) If the there is winner - Show it in an
 *    alert message - (Ex - Winner is X or O) - Displaying name is not
 *    important.
 * 7. The game should reset itself once a winner is determined.
 * 8. After all the moves have exhausted, you're not required to display any
 *    message. (It should be obvious to Reset play.)
 */
function play() {
  if (!started) {
    alert("The game has not started.")
    return
  }

  move_type = ["O","X"]
  move_id = document.getElementById("move_text_id").value
  valid_move = false;
  for (cell_id of table_ids) {
    cell = document.getElementById(cell_id)
    if (cell.innerHTML === move_id)
    {
	  cell.style.color = "white";
	  cell.style.fontWeight = "bold";
      cell.innerHTML = move_type[turn]
      turn = 1 - turn
      document.getElementById("turn_info").innerHTML = "Turn for : <b>" + move_type[turn] + "</b>"
      valid_move = true;
    }
  }

  if(valid_move)  {
    // Compose strings containing concatenated versions of all lines of three cells
    checks = [];
    for (var i=0; i<8; i++) checks.push("")
    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        checks[i]   += document.getElementById(table_ids[i*3+j]).innerText    // Get all rows
        checks[i+3] += document.getElementById(table_ids[i+j*3]).innerText    // Get all columns
      }
      checks[6] += document.getElementById(table_ids[i*4]).innerText          // Get forward diagonal
      checks[7] += document.getElementById(table_ids[i*2+2]).innerText        // Get backward diagonal
    }

    for (line of checks) {
      if (line === "XXX" || line === "OOO") {
        alert("Winner is " + line[0] + "!")
        reset_play()
      }
    }
  }
  else alert("Invalid Move!")
}

/**
 * Do not change this method.
 */
function moveEnter(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    play();
  }
}

reset_play();