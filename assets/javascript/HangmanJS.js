var fourletters = ["abet","aeon","ajar","balk","bonk","busk","cope","capo","conk","daft","daub","dupe","epee","eave","eddy","fife","flux","foal","gale","gimp","gyro","hoax","heft","haze","iamb","isle","iota","jamb","joey","jynx","kudu","kale","khan","leke","lair","lull","mast","maim","molt","nigh","null","nabe","oath","okra","obos","pall","plop","pupa","quid","quip","quiz","ritt","rale","rusk","sift","shiv","sump","talc","tiff","tush","upas","utes","vail","volt","vice","woes","weft","wale","yips","yawn","zine","zeal"];
var fiveletters = ["adhoc","angst","auger","bevel","binge","broil","chard","covet","crimp","dingy","dread","ditzy","evade","enact","envoy","filet","frisk","forte","gaffe","guile","grout","henna","hyper","havoc","horde","infer","ionic","iliac","joust","jetty","julep","kebab","knurl","khaki","lathe","leper","luffa","mania","merit","mogul","musty","nylon","naval","naive","opera","ouija","oasis","parse","peril","posit","psalm","quail","query","quiff","ratio","rebar","renal","rivet","satyr","sauce","shuck","sinus","synch","taboo","tipsy","toxin","tunic","ulnar","under","usher","vague","vigor","voila","weigh","widow","wreack","yeast","yodle","zesty"];
var sixletters = ["appeal","access","agency","bayous","blanch","biopsy","camber","caucus","curdle","dapper","dilate","druids","eczema","egress","eulogy","fathom","forego","frumpy","gander","gelato","glycol","halter","hoarse","hurtle","incise","iodide","ignore","jovial","joules","jilted","kevlar","kidney","kwanza","lavish","litany","lychee","mangle","medial","mistle","nausea","nozzle","nuance","oodles","oracle","oxford","parcel","phylum","putrid","quartz","quirks","quinoa","rappel","rococo","rudder","schism","septum","stroma","tartan","tetras","trifle","udders","utmost","usurps","valour","vanity","voyeur","wallow","wheeze","wraith","yuppie","yippee","zephyr","zodiac"];
var possibleAnswers = fourletters;
var answerPos = getRndInteger(0,possibleAnswers.length -1);
var answer = possibleAnswers[answerPos];
var a = 0;
var wrongGuess = "";
var rightGuess = "";
var lives = 9;
var winDetect = 0;

// initialize game parameters
document.addEventListener("DOMContentLoaded", initialize());


// detect keypresses to play the game
document.addEventListener("keypress",function(event){
	if((event.keyCode >= 97 && event.keyCode<= 122) || (event.keyCode >=65 && event.keyCode <= 90)){
		a = event.key;
		a = a.toLowerCase();
		console.log(a);
		gameplay();
	}
	else{
		document.getElementById("messagebox").className = "bg-warning";
		document.getElementById("messagebox").innerHTML = "Not valid key. Enter A-Z.";
	}
});


//FUNCTIONS

// called when user clicks on onscreen keyboard
function letterassign(letter_clicked){
	a = letter_clicked;
	console.log(a);
	gameplay();
};

// sets the array of possible answers to the corresponding # of letters
function whichAnsrArray(button_clicked){
	console.log(button_clicked);
	if (button_clicked === 4){
		possibleAnswers = fourletters;
		document.getElementById("messagebox").className = "bg-info";
		document.getElementById("messagebox").innerHTML = "4 letter words chosen. Press reset to start a new game.";
		return;
	}
	if(button_clicked === 5){
		possibleAnswers = fiveletters;
		document.getElementById("messagebox").className = "bg-info";		
		document.getElementById("messagebox").innerHTML = "5 letter words chosen. Press reset to start a new game.";
		return;
	}
	if(button_clicked === 6){
		possibleAnswers = sixletters;
		document.getElementById("messagebox").className = "bg-info";		
		document.getElementById("messagebox").innerHTML = "6 letter words chosen. Press reset to start a new game.";		
		return;
	}
};

// main function to analze letter input
function gameplay(){
	// only run the gameplay function if the game is not lost or won 
	if(lives != 0 && winDetect != answer.length){
		// check if key is an answer
		if (answer.indexOf(a) === -1){
			// key not in the answer, so check if key has been guessed before
			if (wrongGuess.indexOf(a) == -1){ 
				// key has not been guessed yet, lose a life and concatenate to wrongGuess list 				
				lives -- ;
				document.getElementById("strikecount").innerHTML = lives;
				document.getElementById("messagebox").className = "bg-warning";				
				document.getElementById("messagebox").innerHTML = 'Incorrect. You have ' + lives + ' lives left.';
				wrongGuess += a;
				wrongguess.innerHTML = wrongguess.innerHTML + '  ' + a + '  ';
					// check to see for game over conditions(5 strikes)
					if (lives === 0){
						gameloss();
					}
			}
			// key has been guessed before, ask for another input
			else{
				document.getElementById("messagebox").className = "bg-warning";
				document.getElementById("messagebox").innerHTML = "You already guessed that letter!";
			}
		}
		// key is an answer
		else{
			//check if key has been guessed before
			if(rightGuess.indexOf(a) == -1){
				rightGuess += a;
				rightguess.innerHTML = rightguess.innerHTML + '  ' + a + '  ';
				// key is somewhere in the answer, reveal those locations in the html
				var counter = 0;
				for(i=0; i<answer.length; i++){
					if(a === answer[i]){
					document.getElementById(i).className = 'show';
					counter ++;
					}
				}
				winDetect += counter;
				document.getElementById("messagebox").className = "bg-success";
				document.getElementById("messagebox").innerHTML = "Nice!";
			}
			else{
				document.getElementById("messagebox").className = "bg-warning";
				document.getElementById("messagebox").innerHTML = "You already guessed that letter!";
			}
		}
		if(winDetect == answer.length){
					gamewon();
		}							
	}
};

function gamewon(){
	document.getElementById("messagebox").className = "bg-success";
	document.getElementById("messagebox").innerHTML="Good job! Press reset to play again!";
	document.getElementById("definitionbutton").className = "visible pad-bottom";
	document.getElementById("def").href = "https://www.merriam-webster.com/dictionary/" + answer ;
};

function gameloss(){
	document.getElementById("messagebox").className = 'bg-danger';
	document.getElementById("messagebox").innerHTML="Game Over. The correct word was '" + answer.toUpperCase() + "' Press reset to play again!" ;
	document.getElementById("definitionbutton").className = "visible pad-bottom";
	document.getElementById("def").href = "https://www.merriam-webster.com/dictionary/" + answer ;
};

function myReset(){
	wrongGuess = "";
	rightGuess = "";
	lives = 9;
	winDetect = 0;
	document.getElementById("wrongguess").innerHTML = wrongGuess;
	document.getElementById("rightguess").innerHTML = rightGuess;
	document.getElementById("strikecount").innerHTML = lives;
	document.getElementById("maingame").innerHTML = "";
	document.getElementById("messagebox").innerHTML = "";
	document.getElementById("definitionbutton").className = "hidden pad-bottom";
	document.getElementById("def").href = "#" ;
	var answerPos = getRndInteger(0,possibleAnswers.length -1);
	answer = possibleAnswers[answerPos];
	console.log(answer);
	initialize();
};

function initialize(){	
	for(i=0;i<answer.length;i++){
		maingame.innerHTML = maingame.innerHTML + '<div class="letterbox">' + '<span class="hidden" id=' + i + '>' + answer[i] + '</span>' +'</div>';
	}
};


	
function getRndInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1) ) + min;
};