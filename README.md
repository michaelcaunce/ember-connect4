## ember-connect4

# Objective

To build a small web-based mobile game, implementing the classic Connect 4 game. The game must follow the standard Connect 4 properties; a seven by six grid, two players, functionality to place their markers. Players can only place their markers in the bottom-most row of the grid or a higher row if there is already a marker in the row below. A player wins the game if they manage to get four of their markers in a row, either horizontally, vertically, or diagonally. 

The application must be built using a framework and must be deployed to a mobile device via Apache Cordova. The application must also implement the following features; 
•	Display the game board 
•	Allow the players to place their markers
•	Detect a winning position
•	Run as an App on a mobile device
•	Implement a Computer Player 

# Aim

The aim was to create a realistic, challenging and entirely functioning usable version of Connect 4. Emphasis was placed on functionality over graphical attraction, with more importance being placed on providing users with a game that functioned as intended, yet still being identifiable with the incorporation of the traditional red and yellow markers. 

# Build Process

The build process adopted a bottom-up logical approach to building the application. With this method, the build started with the foundations, all the installations required to run the application. The set approach adopted a parallel design where the building of the application and extensive testing were completed together. Once the foundations of the application had been laid, the functionality and game dependents began to be constructed. The bottom-up approach was appropriate for the order of development based on the requirements of the game. For example, it would not be logical to work on identifying winning patterns first, as there would be no way of testing the functionality without the dependents created (game board, markers, click function, start function). The benefit to this approach was the allowance for stringent testing of each function before progressing onto the next. 

# Computer Player

In an attempt to make the computer player smarter, the computer needed to look to the future. The minimax algorithm determines all possible moves. This creates the game tree which represents sequences of possible moves. It then calculates the heuristic score of the leaf nodes. Moreover, finally, moves back up the game tree, aggregating the scores for all possible moves.
To fully incorporate the minimax algorithm, additional code refactoring was required. A deepClone function was created which clones the state matrix. This was required because when the minimax algorithm creates the game tree, it holds all the possible moves. Thus it is essential to hold many copies of the state matrix.

A recursive minimax function was created which was similar to the previous code used for the standard computer player. However, minimax calls the deepClone function every time a potential move is generated, additionally storing the state upon each move. The minimax function works by checking to see if the game is at a leaf in the game tree or an internal node. If it is at a leaf, the score is determined on whether a player has won. The computer player at this point was significantly better but still quite beatable. To make the computer player even stronger, the basic heuristic was improved. 

To achieve a smarter computer player, a new heuristic function, match_pattern function and match_pattern_at function was created along with a list of patterns. The heuristic function loops over a list of patterns then uses the match_pattern function to test if the patterns match for the player playing. If it matches for the computer player, the patterns score is attached to the score. If it matches the user, the pattern score is subtracted from the score. Such an approach ensures that the final score value balances both how good the position is for the computer player and the user. 

The match_pattern function checks to see if the pattern matches anywhere in the current state for the given player, by looping over all squares in the state and then using the match_pattern_at function. As the match_pattern_at function is called with the initial x and y co-ordinates to start matching at, a list of patterns had to be defined. The list of patterns is called to determine the score attached to each pattern.

With the implementation of minimax and a more advanced heuristic, the computer player feature was complete. While this was a complex task and required a deeper level of thinking, the application benefits hugely with the addition. It is acknowledged that the most basic of implementation would have been sufficient to some. However, the aim was always to make the game realistic and challenging. A basic computer player would not have met the aim of the game.







