window.onload = function(){
	var turn;
	var gameOver;
	var tieGame;
	var table = document.querySelector("table");
	var box = document.querySelectorAll("td");
	var newGame = document.querySelector("#newGame");

	table.addEventListener("click", function(event){
		//prevents further moves if a player has won
		if(gameOver){
			displayMessage("Congratulations, Player " + turn + " wins!");	
		} else if(event.target.innerText === ""){
			event.target.innerText = turn;
			changePlayers();
		}
	})

	newGame.addEventListener("click", function(){
		init();
	})

	//initializes the game
	function init(){
		turn = "X";
		gameOver = false;
		tieGame = false;
		newGame.style.backgroundColor = "#e6e6e6";
		for(var i = 0; i < box.length; i++){
			box[i].innerText = "";
			box[i].style.color = "black";
		}
		//randomly chooses who starts first
		if(Math.random() < 0.5){
			turn = "O";
		}
		displayMessage("Player " + turn + "'s turn");
	}

	//prevents player change if a player has won or a tie game
	function changePlayers(){
		if(checkForWinner(turn)){
			displayMessage("Congratulations, Player " + turn + " wins!");
			newGame.style.backgroundColor = "#228B22";
		} else if(checkForTie()){
			displayMessage("Tie Game!");
		} else if(turn === "X"){
			turn = "O";
			displayMessage("Player " + turn + "'s turn");
		} else {
			turn = "X";
			displayMessage("Player " + turn + "'s turn");
		}
	}

	//tie when all boxes are filled and there is no winner
	function checkForTie(){
		var turnCount = 0;
		for(var i = 0; i < box.length; i++){
			if(box[i].innerText !== ""){
				turnCount++;
			}
		}
		if(turnCount >= 9 && !gameOver){
			tieGame = true;
		}
		return tieGame;
	}

	//player wins when one of the eight conditions is satisfied
	function checkForWinner(player){
		if(checkRow("1", "2", "3", player) || 
		checkRow("4", "5", "6", player) || 
		checkRow("7", "8", "9", player) || 
		checkRow("1", "4", "7", player) || 
		checkRow("2", "5", "8", player) || 
		checkRow("3", "6", "9", player) || 
		checkRow("1", "5", "9", player) || 
		checkRow("3", "5", "7", player)){
			gameOver = true;
		}
		return gameOver;
	}

	//checks if the text of the three boxes selected matches the specific player
	function checkRow(box1, box2, box3, player){
		if(selectBox(box1) === player && selectBox(box2) === player && selectBox(box3) === player){
			gameOver = true;
		}
		if(gameOver){
			winColor(box1);
			winColor(box2);
			winColor(box3);
		}
		return gameOver;
	}

	//displays the message that is passed into the function
	function displayMessage(message){
		return document.getElementById("message").innerText = message;
	}

	//selects the text for a given box
	function selectBox(box){
		return document.getElementById(box).innerText;
	}

	//changes text color of winning boxes to green
	function winColor(box){
		return document.getElementById(box).style.color = "#228B22";
	}

	init();
}	