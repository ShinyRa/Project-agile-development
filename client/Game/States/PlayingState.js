class PlayingState extends BaseGameState
{
	constructor()
	{
		super();

		this.ballViewer = new BallViewer();
		this.bingo = new Bingo(this.ballViewer.getRandomBallColourHex());
		this.winner = "";
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
	{

	}

	/**
	 * Get State name.
	 */
	getName()
	{
		return "PlayingState";
	}

	setWinner(name){
	    this.winner = name;
    }

    getWinner(){
        return this.winner;
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
				this.BingoPlayingState();

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
		let modalContent = document.getElementById("getallenmodalcontent");
		let span = document.getElementsByClassName("close")[0];

		let drawnballs = this.ballViewer.getDrawnBallsList();

		$('body').on('click', '#getallenList', () => {
			roundNumber = this.ballViewer.getRoundNum();

			for (let i = 0; i < roundNumber; i++) {
				if (roundNumber - i === 1){
					modalContent.innerHTML += drawnballs[i].message;

				}
				else {
					modalContent.innerHTML += drawnballs[i].message  + ", ";
				}
			}
			modal.style.display = "block";
		});

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

	BingoPlayingState()
	{
		let roundNumber;
		let bingoModal = document.getElementById("bingoModal");
		let bingoModalContent = document.getElementById("bingomodalcontent");
		let bingoSpan = document.getElementById("closeBingo");
		let selectBingoName = document.getElementById("bingoSelectName");
		let bingoSaveWinnerButton = document.getElementById("bingoSaveWinnerButton");

		let drawnballs = this.ballViewer.getDrawnBallsList();
			roundNumber = this.ballViewer.getRoundNum();
		for (let i = 0; i < roundNumber; i++) {
			if (roundNumber - i === 1){
				bingoModalContent.innerHTML += drawnballs[i].message;
			}
			else {
				bingoModalContent.innerHTML += drawnballs[i].message  + ", ";
			}
		}
			bingoModal.style.display = "block";

			$("#bingoSelectName").empty();
		for(let i = 0; i < this.namesArray.length; i++) {
			let opt = document.createElement('option');
			opt.innerHTML = this.namesArray[i];
			opt.value = this.namesArray[i];
			selectBingoName.appendChild(opt);
		}

        $('body').on('click', '#bingoSaveWinnerButton', () => {
            this.setWinner(selectBingoName.options[ selectBingoName.selectedIndex ].value);

        });

		bingoSpan.onclick = function() {
			bingoModal.style.display = "none";
			bingoModalContent.innerHTML = "";
		};

		window.onclick = function(event) {
			if (event.target == bingoModal) {
				bingoModal.style.display = "none";
				bingoModalContent.innerHTML = "";
			}
		}
	}

}