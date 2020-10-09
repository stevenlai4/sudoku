var difficulty = "easy";
var obj = JSON.parse(JSON.stringify(puzzle_numbers));
var maxPuzzleIndex = 2;
var newPuzzleNum;
var timer = [0,0,0,0,0];
var interval;

const sudoku = new Sudoku();

//Get a different puzzle every time
function getDiffRandomInt(min, max, currentNum){
	var random = Math.floor(Math.random() * (max-min+1)) + min;
	return random == currentNum ? getDiffRandomInt(min, max, currentNum) : random;
}

////////////////////////////Timer Functions Start////////////////////////////////////
function leadingZero(time){
	if(time <= 9){
		time = "0" + time;
	}

	return time;
}

function runTimer(){
	let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
	document.getElementById("timer").innerHTML = currentTime;
	timer[4]++;

	timer[0] = Math.floor(timer[1]/60);
	timer[1] = Math.floor((timer[4]/100)/60);
	timer[2] = Math.floor((timer[4]/100) - timer[1] * 60);
	timer[3] = Math.floor(timer[4] - (timer[2] * 100) - (timer[1] * 6000));

}

function startTimer(){
	interval = setInterval(runTimer, 10);
}

function resetTimer(){
	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0,0];

	document.getElementById("timer").innerHTML = "00:00:00";
}
////////////////////////////Timer Functions End/////////////////////////////////////

//Create grid
window.onload = sudoku.createGrid();
//Insert an easy puzzle when the window is opened
window.onload = sudoku.insertPuzzle(difficulty, getDiffRandomInt(0, maxPuzzleIndex, obj.easy_num));
//Start timer
window.onload = startTimer();

//Easy button eventListener
document.getElementById("easy").addEventListener("change", function(){
		newPuzzleNum = getDiffRandomInt(0,maxPuzzleIndex,obj.easy_num);
		obj.easy_num = newPuzzleNum;
		sudoku.resetGrid();
		difficulty = "easy";
		sudoku.insertPuzzle(difficulty, newPuzzleNum);
		resetTimer();
		startTimer();
});

//Medium button eventListener
document.getElementById("medium").addEventListener("change", function(){
	newPuzzleNum = getDiffRandomInt(0,maxPuzzleIndex,obj.medium_num);
	obj.medium_num = newPuzzleNum;
	sudoku.resetGrid();
	difficulty = "medium";
	sudoku.insertPuzzle(difficulty, newPuzzleNum);
	resetTimer();
	startTimer();
});

//Hard button eventListener
document.getElementById("hard").addEventListener("change", function(){
	newPuzzleNum = getDiffRandomInt(0,maxPuzzleIndex,obj.hard_num);
	obj.hard_num = newPuzzleNum;
	sudoku.resetGrid();
	difficulty = "hard";
	sudoku.insertPuzzle(difficulty, newPuzzleNum);
	resetTimer();
	startTimer();
});

//New game button eventListener
document.getElementById("new_game").addEventListener("click", function(){
	if(difficulty == "easy"){
		newPuzzleNum = getDiffRandomInt(0,maxPuzzleIndex,obj.easy_num);
		obj.easy_num = newPuzzleNum;
	}
	else if(difficulty == "medium"){
		newPuzzleNum = getDiffRandomInt(0,maxPuzzleIndex,obj.medium_num);
		obj.medium_num = newPuzzleNum;
	}
	else{
		newPuzzleNum = getDiffRandomInt(0,maxPuzzleIndex,obj.hard_num);
		obj.hard_num = newPuzzleNum;
	}
	sudoku.resetGrid();
	sudoku.insertPuzzle(difficulty, newPuzzleNum);
	resetTimer();
	startTimer();
});

//Reset button eventListener
document.getElementById("reset").addEventListener("click", function(){
	let currentIndex;
	if(difficulty == "easy"){
		currentIndex = obj.easy_num;
	}
	else if(difficulty == "medium"){
		currentIndex = obj.medium_num;
	}
	else{
		currentIndex = obj.hard_num;
	}
	sudoku.resetGrid();
	sudoku.insertPuzzle(difficulty, currentIndex);
	resetTimer();
	startTimer();
});