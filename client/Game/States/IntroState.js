class IntroState extends BaseGameState
{
	constructor()
	{
		super();
		this.clickedMouse = false;
		this.text = new PulsingText(
			"Klik ergens om het spel te beginnen...",
			window.innerWidth  / 2,
			window.innerHeight / 3,
			40
		);

		$('.controls').hide();
		$('.menu').hide();
		$('.name-input').hide();
		this.backgroundBalls = [];
		this.fillBallsArray();
	}

	setup()
	{ }

	/**
	 * Draw State to screen.
	 */
	draw()
	{
		background(255);
		this.text.draw();

		for (let currentBall in this.backgroundBalls) {
			this.backgroundBalls[currentBall].draw();
			this.backgroundBalls[currentBall].update();
		}
		if (this.clickedMouse) {
			for (let currentBall in this.backgroundBalls) {
				if ( ! this.backgroundBalls[currentBall].isVisible()) {
					stateSwitcher.switchTo(1);
					$('.name-input').show();
				}
				this.backgroundBalls[currentBall].apply(new p5.Vector(0, 1));
				this.backgroundBalls[currentBall].fadeOut("slow");
			}	
		}
	}


	/**
	 * Handle mouse click event
	 */
	handleMouseClick()
	{
		this.text.fadeOut();
		this.clickedMouse = true;
	}

	/**
	 * Handle button press event
	 */
	handleButtonPress()
	{ }

	/**
	 * Get State name.
	 */
	getName()
	{
		return "IntroState";
	}

	stopButtonPlayingState ()
	{
		$('.name-input').hide();
		$('.controls').hide()
		stateSwitcher.switchTo(3);
	}

	fillBallsArray()
	{
		for (let i = 0; i < 15; i++) {
			this.backgroundBalls.push(
				new Ball(
					Math.floor(Math.random() * window.innerWidth),
					50,
					Math.floor(Math.random() * 5) - Math.floor(Math.random() * 5),
					Math.floor(Math.random() * 4) + 2,
					80,
					Math.floor(Math.random() * 75) + 1,
					255
				)
			)
		}
	}
}