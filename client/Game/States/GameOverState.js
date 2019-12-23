let resourceManager;

class GameOverState extends BaseGameState
{
	/**
	 * Draw State to screen.
	 */


	constructor(){
		super();
		this.backgroundBalls = [];
		this.text = new PulsingText(
			"Game over...",
			window.innerWidth  / 2,
			window.innerHeight / 3,
			40
		);
		this.text2 = new PulsingText(
			"Bedankt voor het spelen!",
			window.innerWidth  / 2,
			window.innerHeight / 1.5,
			40
		);
		resourceManager = new ResourceManager();
		resourceManager.load('im_so_excited.mp3', 'im_so_excited', 'sound');
	}

	draw()
	{
		background(255);
		this.text.draw();
		this.text1.draw();
		this.text2.draw();
		for (let currentBall in this.backgroundBalls) {
			this.backgroundBalls[currentBall].draw();
			this.backgroundBalls[currentBall].update();
		}
	}


	/**
	 * Handle mouse click event
	 */
	handleMouseClick()
	{
		if (resourceManager.get('im_so_excited').isPlaying()) {
			resourceManager.get('im_so_excited').stop();
		} else {
			resourceManager.get('im_so_excited').play();
		}
	}

	/**
	 * Handle button press event
	 */
	handleButtonPress()
	{

	}

	/**
	 * Get State name.
	 */
	getName()
	{
		return "GameOverState";
	}


	setup()
	{
		this.namesArray = stateSwitcher.getState(1).getNamesArray();
		this.fillBallsArray(this.namesArray);
		this.text1 = new PulsingText(
			"Winnaar is: "+  stateSwitcher.getState(2).getWinner() +"!",
			window.innerWidth  / 2,
			window.innerHeight / 2,
			40
		);
		/*this.song=loadSound('downloads/I_m so excited.mp3');
		this.gif=createImage("../client/downloads/GIF(dans).gif");*/

	}
	fillBallsArray(name) {
		for (let i = 0; i < this.namesArray.length; i++) {
			this.backgroundBalls.push(
				new Ball(
					Math.floor(Math.random() * window.innerWidth),
					100,
					Math.floor(Math.random() * 3) - Math.floor(Math.random() * 5),
					Math.floor(Math.random() * 2) + 2,
					120,
					name[i],
					255
				)
			)
		}

	}
}