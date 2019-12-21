let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let canvas;
let stateSwitcher;

function setup()
{
	stateSwitcher = new StateSwitcher();
	stateSwitcher.setStates(
		[
			new IntroState(),
			new AddNamesToPlayingState(),
			new PlayingState(),
			new GameOverState()
		]
	);
	
	stateSwitcher.switchTo(0);

	canvas = createCanvas(canvasWidth, canvasHeight);
	textAlign(CENTER);
}

function draw()
{
	background(255);
	 stateSwitcher
	 	.getCurrentState()
	 	.draw();
}

function mousePressed()
{
	 stateSwitcher
	 	.getCurrentState()
	 	.handleMouseClick(this.canvas);
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function openMenu() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeMenu() {
	document.getElementById("mySidenav").style.width = "0";
}
