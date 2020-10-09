class Sudoku { 
	constructor() {
	}

	//Function that generate a Sudoku grid when the web is opened
	createGrid(){
		var htmlText = '';
		for(let row = 1; row <= 9; row++){
			if(row == 3 || row == 6){
				htmlText += '<tr style="border-bottom: 5px solid black;">';
			}
			else{
				htmlText += '<tr>';
			}

			for(let col = 1; col <= 9; col++){
				if(col == 3 || col == 6){
					htmlText += '<td class="cell" style="border-right: 5px solid black;"><input id =' + row  + '_' + col + ' maxlength="1" type="text" onClick="this.select()"></td>';
				}
				else{
					htmlText += '<td class="cell"><input id =' + row  + '_' + col + ' maxlength="1" type="text" onClick="this.select()"></td>';
				}
			}
			htmlText += '</tr>';
		}

		document.getElementById("grid").innerHTML = htmlText;
	}

	//Check the validity of an input when user enter a digit (BFS algorithm)
	checkInputValidity(){
		var cellID = this.id;
		var SUDOKU_SOLVED = false;
		let val = this.value;
		let row = cellID.substring(0,1);
		let col = cellID.substring(2);
		let sectStartRow = (row-1)-(row-1)%3+1;
		let sectStartCol = (col-1)-(col-1)%3+1;

		//Check if the input is from 1-9
		if(val=="" || isNaN(val) || val == 0){
			this.value = "";
			this.setAttribute("style", "color: blue;");
		}
		else{
			this.setAttribute("style", "color: blue;");
			//Check col validity
			for(let i = 1; i <= 9; i++){
				if(i != col){
					let temp = document.getElementById(row + "_" + i).value;

					if(temp == val){
						this.setAttribute("style", "color: red;");
						break;
					}
				}
			}

			//Check row validity
			for(let i = 1; i <= 9; i++){
				if(i != row){
					let temp = document.getElementById(i + "_" + col).value;

					if(temp == val){
						this.setAttribute("style", "color: red;");
						break;
					}
				}
			}

			//Check section/box validity
			for(let r = 0; r < 3; r++){
				for(let c = 0; c < 3; c++){
					if(r+sectStartRow != row && c+sectStartCol != col){
						let temp = document.getElementById((r+sectStartRow) + "_" + (c+sectStartCol)).value;

						if(temp == val){
							this.setAttribute("style", "color: red;");
							break;
						}
					}
				}
			}

			//Check if a Sudoku game is completed
			loop1:
				for(let r = 1; r <= 9; r++){
					for(let c = 1; c <= 9; c++){ 
						if(document.getElementById(r + "_" + c).value == "" ||
							document.getElementById(r + "_" + c).style.color == "red"){
							break loop1;
						}
						else if(r == 9 && c == 9){
							SUDOKU_SOLVED = true;
						}
					}
				}

			//If complete then pop up a box to confirm
			if(SUDOKU_SOLVED == true){
				clearInterval(interval);
				let timeTaken = document.getElementById("timer").innerHTML;
				if(confirm("Congratulation! You complete the puzzle in " + timeTaken + "! Do you want to start a new game?")){
					document.getElementById("new_game").click();
					resetTimer();
					startTimer();
				}
			}
		}
	}

	//Reset grid to empty
	resetGrid(){
		for(let row=1; row <= 9; row++){
				for(let col=1; col <= 9; col++){
					document.getElementById(row + "_" + col).value = "";
					document.getElementById(row + "_" + col).disabled = false;
					document.getElementById(row + "_" + col).removeEventListener("keyup", this.checkInputValidity);
				}
		}
	}

	//Insert Sudoku puzzle based on difficulty
	insertPuzzle(diff, puzzleIndex) {
		var puzzle;
		var obj = JSON.parse(JSON.stringify(puzzles));

		if(diff == "easy"){
			puzzle = obj.easy_puzzles[puzzleIndex];
			for(let row=1; row <= 9; row++){
				for(let col=1; col <= 9; col++){
					if(puzzle[row-1][col-1] != undefined){
						document.getElementById(row + "_" + col).setAttribute("style", "color: black;");
						document.getElementById(row + "_" + col).value = puzzle[row-1][col-1];
						document.getElementById(row + "_" + col).disabled = true;
					}
					else{
						document.getElementById(row + "_" + col).setAttribute("style", "color: blue;");
						document.getElementById(row + "_" + col).addEventListener("keyup", this.checkInputValidity);
					}
				}
			}
		}
		else if(diff == "medium"){
			puzzle = obj.medium_puzzles[puzzleIndex];
			for(let row=1; row <= 9; row++){
				for(let col=1; col <= 9; col++){
					if(puzzle[row-1][col-1] != undefined){
						document.getElementById(row + "_" + col).setAttribute("style", "color: black;");
						document.getElementById(row + "_" + col).value = puzzle[row-1][col-1];
						document.getElementById(row + "_" + col).disabled = true;
					}
					else{
						document.getElementById(row + "_" + col).setAttribute("style", "color: blue;");
						document.getElementById(row + "_" + col).addEventListener("keyup", this.checkInputValidity);
					}
				}
			}
		}
		else if(diff == "hard"){
			puzzle = obj.hard_puzzles[puzzleIndex];
			for(let row=1; row <= 9; row++){
				for(let col=1; col <= 9; col++){
					if(puzzle[row-1][col-1] != undefined){
						document.getElementById(row + "_" + col).setAttribute("style", "color: black;");
						document.getElementById(row + "_" + col).value = puzzle[row-1][col-1];
						document.getElementById(row + "_" + col).disabled = true;
					}
					else{
						document.getElementById(row + "_" + col).setAttribute("style", "color: blue;");
						document.getElementById(row + "_" + col).addEventListener("keyup", this.checkInputValidity);
					}
				}
			}
		}
	}
}