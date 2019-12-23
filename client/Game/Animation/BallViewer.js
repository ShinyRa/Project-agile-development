class BallViewer extends GameObject
{
	constructor()
	{
		super(
			new p5.Vector(20, 20),
			new p5.Vector(0, 0)
		);

		this.MAX_BALLS = 75;
		this.drawnBalls = [];
		this.initBallList();
		this.ballcolours = [
			"#03A9F4",
			"#4CAF20",
			"#009688",
			"#673AB7",
			"#9C27B0",
			"#E91E63"
		];
		this.roundNum = 0;
		this.drawnBalls[0].fadeIn();
		this.drawnBalls[0].slideTo(new p5.Vector(window.innerWidth / 2, window.innerHeight / 4));
	}

	draw()
	{
		this.drawnBalls[this.roundNum].update();
		this.drawnBalls[this.roundNum].draw();

		if ((this.roundNum - 1) >= 0) {
			this.drawnBalls[this.roundNum - 1].update();
			this.drawnBalls[this.roundNum - 1].draw();
		}

	}

	/**
	 * Creates an array of all ball number draws based on gameType.
	 */
	initBallList()
	{
		let iterations = 0;
		while (iterations < this.MAX_BALLS) {
		 	let digit = Math.floor(Math.random() * this.MAX_BALLS) + 1;

			if (this.drawnBalls.indexOf(digit) < 0) {
				this.drawnBalls.push(
					new Ball(
						window.innerWidth / 2 - 120, 
						window.innerHeight / 4,
						0,
						0,
						120,
						digit,
						255
					)
				);
				iterations++;
			}
		}
	}

	getRandomBallColourHex()
	{
		return this.ballcolours[Math.floor(Math.random() * this.ballcolours.length)];
	}

	nextBall()
	{
		this.roundNum++;
		$('svg > text').each((i, _) => { 
			$(_).text(
				(this.drawnBalls[this.roundNum - i])
					? this.drawnBalls[this.roundNum - i].getNumber()
					: ""
			); 
		});
		this.drawnBalls[this.roundNum].fadeIn();
		this.drawnBalls[this.roundNum].slideTo(new p5.Vector(window.innerWidth / 2, window.innerHeight / 4));
		this.drawnBalls[this.roundNum - 1].slideTo(new p5.Vector(window.innerWidth / 2 + 120, window.innerHeight / 4));
		this.drawnBalls[this.roundNum - 1].fadeOut();
		this.gameover()
	}

	preload()
	{
		resourceManager = new ResourceManager();
		resourceManager.load('dans.gif', 'dans', 'gif');
		resourceManager.load('im_so_excited.mp3', 'im_so_excited', 'sound');
		resourceManager.get('im_so_excited').setVolume(0.1);
		resourceManager.get('dans').position(600, 400);
	}

	getRoundNum()
	{
		return this.roundNum;
	}

	getDrawnBallsList()
	{
		return this.drawnBalls;
	}
	gameover() {
		if (this.roundNum+1 >= this.MAX_BALLS) {
			stateSwitcher.switchTo(3);
			$('.controls').hide();
			$('.menu').hide();
			this.preload();
		}
	}

}