class BaseGameState
{
	/**
	 * Draw State to screen.
	 */
	draw()
	{ }

	/**
	 * Handle mouse click event
	 */
	handleMouseClick()
	{
		return false;	
	}

	/**
	 * Handle button press event
	 */
	handleButtonPress()
	{
		return false;
	}

	/**
	 * Get State name.
	 */
	getName()
	{
		return "BaseGameState";
	}

	setup()
	{

	}

}