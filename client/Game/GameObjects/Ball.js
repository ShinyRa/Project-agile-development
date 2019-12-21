class Ball extends GameObject
{
	constructor(
		x,
		y,
		xvel,
		yvel,
		dia,
		message,
		textColour = 0,
	) {
		super(
			new p5.Vector(x, y),
			new p5.Vector(xvel, yvel)
		);

		this.ballcolours = [
			"#03A9F4",
			"#4CAF20",
			"#009688",
			"#673AB7",
			"#9C27B0",
			"#E91E63"
		];

		this.dia = dia;
		this.message = message;
		let ballColour = this.ballcolours[Math.floor(Math.random() * this.ballcolours.length)];
		this.ballColour = color(ballColour);
		this.textColour = color(textColour);
		this.colourAlpha = 161;
		this.MAX_COLOUR_ALPHA = 161;
		this.isFadingIn  = false;
		this.isFadingOut = false;
		this.isSliding   = false;
		this.fadeInMethod  = "slow";
		this.fadeOutMethod = "slow";
		this.isSlidingTo = null;
	}

	draw()
	{
		this.ballColour.setAlpha(this.colourAlpha);
		this.textColour.setAlpha(this.colourAlpha);

		fill(this.ballColour);
		ellipse(
			this.positionVector.x + 5,
			this.positionVector.y + 7,
			this.dia,
			this.dia
		);

		noFill();
		stroke(67, this.colourAlpha);
		ellipse(
			this.positionVector.x,
			this.positionVector.y,
			this.dia,
			this.dia
		);
		noStroke();
		
		fill(this.textColour);
		textSize(this.dia / 3);
		text(
			this.message,
			this.positionVector.x,
			this.positionVector.y
		);
	}

	update()
	{
		this.velocityVector.add(this.accelerationVector);
		this.positionVector.add(this.velocityVector);

		if (this.positionVector.x + (this.dia / 2) > canvas.width || this.positionVector.x - (this.dia / 2) < 0) {
			this.velocityVector.x *= -1;
		}

		if (this.positionVector.y + (this.dia / 2) > canvas.height || this.positionVector.y - (this.dia / 2) < 0) {
			this.velocityVector.y *= -1;
		}

		if (
			this.isFadingIn &&
			this.colourAlpha < this.MAX_COLOUR_ALPHA
		) {
			this.colourAlpha += 4;
		} else {
			this.isFadingIn = false;
		}

		if (
			this.isFadingOut &&
			this.colourAlpha > 0
		) {
			this.colourAlpha -= 4;
		} else {
			this.isFadingOut = false;
		}

		if (
			this.isSliding &&
			this.positionVector.x <= this.isSlidingTo.x
		) {
			this.positionVector.x += 4;
		} else {
			this.isSliding = false;
		}

		this.accelerationVector.mult(0);
	}

	fadeOut( method )
	{
		this.fadeOutMethod = method;
		this.isFadingOut = true;
	}

	fadeIn( method )
	{
		this.fadeInMethod = method;
		this.colourAlpha = 0;
		this.isFadingIn = true;
	}

	isVisible()
	{
		return this.colourAlpha > 0;
	}

	getNumber()
	{
		return this.message;
	}

	slideTo( vector )
	{
		this.isSliding = true;
		this.isSlidingTo = vector;
	}

	apply( force ) 
	{
		this.accelerationVector.add(force);
	}
}
