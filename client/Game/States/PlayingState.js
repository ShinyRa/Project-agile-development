class PlayingState extends BaseGameState
{
	constructor()
	{
		super();

		this.ballViewer = new BallViewer();
		this.bingo = new Bingo(this.ballViewer.getRandomBallColourHex());
        this.text = new PulsingText(
            "",
            window.innerWidth  / 2,
            window.innerHeight / 2,
            40
        );
	}

	setup()
	{
		this.namesArray = stateSwitcher.getState(1).getNamesArray();
		this.button1Loop();
		this.button2Loop();
		this.getallenButtonPlayingState();
	}

	draw()
	{
		$('.menu').show();
		background((this.bingo.isVisible()) ? 200 : 255);
		if ( ! this.bingo.isVisible()) {
			this.ballViewer.draw();
		}
        this.text.draw();
		this.bingo.draw();
		this.bingo.update();
	}

	handleMouseClick(canvas)
	{ }

	/**
	 * Get State name.
	 */
	getName()
	{
		return "PlayingState";
	}

	handleButtonPress()
	{

		let number = Math.floor(Math.random() * (+this.namesArray.length - +0)) + +0;
        this.text = new PulsingText(
            "Klik op de rode knop " + this.namesArray[number] + "...",
            window.innerWidth  / 2,
            window.innerHeight / 2,
            40
        );
		this.ballViewer.nextBall();
	}

	/**
	 * Get ball letter by digit.
	 *
	 * @return char
	 */
	getLetterByDigit( digit )
	{
		switch (true) {
			case digit <= 15:
				return 'B';
			case digit <= 30:
				return 'I';
			case digit <= 45:
				return 'N';
			case digit <= 60:
				return 'G';
			case digit <= 75:
				return 'O';
		}
	}

	button1Loop()
	{
		ajaxRequest('GET', '/getbutton1', (data, xhr) => {
			if (data[0]["button1"] == 1) {
				this.handleButtonPress();
			}
			
			ajaxRequest('GET', '/setbutton1', (data, xhr) => {
				setTimeout(() => {
					this.button1Loop();
				}, 2000);
			});
		});
	}


	button2Loop()
	{
		ajaxRequest('GET', '/getbutton2', (data, xhr) => {
			if (data[0]["button2"] == 1) {
				this.bingo.show();

			}
			ajaxRequest('GET', '/setbutton2', (data, xhr) => {
				setTimeout(() => {
					this.button2Loop();
				}, 2000);
			});
		});
	}
	stopButtonPlayingState ()
	{
		$('.name-input').hide();
		$('.controls').hide()
		stateSwitcher.switchTo(3);
	}

	getallenButtonPlayingState()
	{
		let roundNumber;
		let modal = document.getElementById("getallenModal");
		let modalContent = document.getElementById("modalcontent");
		let btn = document.getElementById("getallenList");
		let span = document.getElementsByClassName("close")[0];

		let drawnballs = this.ballViewer.getDrawnBallsList();

		btn.onclick = function() {
			this.ballViewer = new BallViewer();
			roundNumber = this.ballViewer.getRoundNum();
			console.log(roundNumber);
			for (let i = 0; i < 75; i++) {
				modalContent.innerHTML += drawnballs[i].message  + ", ";
			}
			modal.style.display = "block";
		};

		span.onclick = function() {
			modal.style.display = "none";
			modalContent.innerHTML = "";
		};

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				modalContent.innerHTML = "";
			}
		}
	}

}