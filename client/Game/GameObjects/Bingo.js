class Bingo
{
	constructor(backgroundColourHex)
	{
		this.fontSize = 72;
		this.fillColor = 0;
		this.visible = false;
		this.rectWidth = 0;
		this.fontX = 0;
		this.backgroundColourHex = backgroundColourHex;
	}

	draw()
	{
		if (this.visible) {
			textSize(this.fontSize);
			rectMode(CORNER);
			fill(this.backgroundColourHex + "50");
			rect(
				0,
				window.innerHeight / 4,
				this.rectWidth,
				180
			);
			fill(255);
			text(
				"Bingo!",
			 	this.fontX,
			 	window.innerHeight / 3
		 	);
		}
	}

	update()
	{
		if (
			this.rectWidth < window.innerWidth &&
			this.isVisible()
		) {
			this.rectWidth += ((window.innerWidth - this.rectWidth) / 5) / 3;
			this.fontX += ((window.innerWidth / 2- this.fontX) / 5) / 2;
		}
	}

	show()
	{
		this.visible = true;
	}

	isVisible()
	{
		return this.visible;
	}
}