class AddNamesToPlayingState extends BaseGameState
{
    constructor()
    {
        super();
        this.clickedMouse = false;
        this.text = new PulsingText(
            "Voeg de namen toe aan het spel...",
            window.innerWidth  / 2,
            window.innerHeight / 3,
            40
        );

        $('.controls').hide();
        $('.menu').hide();
        this.backgroundBalls = [];
        this.namesArray = [];

    }

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
                let switched = false;

                for (let currentBall in this.backgroundBalls) {
                    if (switched) {
                        continue;
                    }

                    if ( ! this.backgroundBalls[currentBall].isVisible()) {
                        switched = true;
                        stateSwitcher.switchTo(2);
                        $('.controls').show();
                        $('.name-input').hide();
                    }
                    this.backgroundBalls[currentBall].apply(new p5.Vector(0, 1));
                    this.backgroundBalls[currentBall].fadeOut("slow");
            }
        }
    }

    setup()
    {

    }


    /**
     * Get State name.
     */
    getName()
    {
        return "AddNamesToPlayingState";
    }

    /**
     * Get Names Array.
     */

    getNamesArray()
    {
       return this.namesArray;
    }


    handleStartButtonPress()
    {
        if (this.namesArray <2){
            alert("Voeg op opzeminst 2 spelers toe om het spel te starten...");
        }else {
            this.text.fadeOut();
            this.clickedMouse = true;
        }
    }

    handleAddButtonPress()
    {
        let name = document.getElementById("name-input-id").value;
        if (name === undefined || name === null || name == "") {
            alert("Voeg spelers toe om het spel te starten...");
        }
        else{
            this.namesArray.push(name);
            this.fillBallsArray(name);
        }

    }

    fillBallsArray(name)
    {
            this.backgroundBalls.push(
                new Ball(
                    Math.floor(Math.random() * window.innerWidth),
                    100,
                    Math.floor(Math.random() * 3) - Math.floor(Math.random() * 5),
                    Math.floor(Math.random() * 2) + 2,
                    120,
                    name,
                    255
                )
            )
    }
}