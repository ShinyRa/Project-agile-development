class StateSwitcher
{
	constructor()
	{
		this.states = [];
    	this.currentStateIndex = 0;	
	}

	switchTo( stateIndex )
	{
    	this.currentStateIndex = stateIndex;
    	this.getState(this.currentStateIndex).setup();
	}

	setStates( states )
	{
    	this.states = states;
	}

	getCurrentState()
	{
		return this.states[this.currentStateIndex];
	}

	getState(stateIndex)
	{
		return this.states[stateIndex];
	}
}