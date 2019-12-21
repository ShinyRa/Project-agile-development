class PulsingText 
{
	constructor(
		_message,
		_x,
		_y,
		_timeout
	) {
		this.x = _x;
		this.y = _y;
		this.message = _message;
		this.timeout = _timeout;
		this.font = loadFont("Game/Animation/CaviarDreams.ttf");
		this.colorAlpha;
		this.fadeDirection;
		this.lastCycle;

		this.MAX_ALPHA     = 120;
		this.FADE_IN       =  2;
		this.FADE_OUT      = -2;
		this.FADE_OUT_FAST = -2;
		this.colorAlpha = 0;
		this.fadeDirection = this.FADE_IN;
		this.lastCycle = false;
	}

	draw() 
	{
		textFont(this.font);
		textSize(52);
		textAlign(CENTER, CENTER);

		if (this.timeout > 0) {
			this.timeout--;
		} else {
			this.colorAlpha += this.fadeDirection;

			this.checkFadeDirection();

			fill(100, this.colorAlpha);
			text(this.message, this.x, this.y);
		}
	}

	fadeOut()
	{
		this.fadeDirection = this.FADE_OUT_FAST;
		this.lastCycle = true;
	}

	/**
	 * Check if text colour fade direction needs to be switched.
	 */
	checkFadeDirection()
	{
		if (this.colorAlpha >= this.MAX_ALPHA) {
			this.fadeDirection = this.FADE_OUT;
		} else if (
			this.colorAlpha <= 0 &&
			this.lastCycle == false
		) {
			this.fadeDirection = this.FADE_IN;
		}
	}
}