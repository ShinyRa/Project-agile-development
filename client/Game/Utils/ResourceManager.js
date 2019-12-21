class ResourceManager
{
	constructor()
	{
		this.loadedAssets = [];
    	this.assetsDirectory = 'Assets/';	
	}

	load( location, alias, type )
	{
		switch (type) {
			case 'image':
				this.loadedAssets[alias] = loadImage(this.assetsDirectory + location);
				break;
			case 'gif':
				this.loadedAssets[alias] = createImg(this.assetsDirectory + location);
				break;
			case 'sound':
				this.loadedAssets[alias] = loadSound(this.assetsDirectory + location);
		}
	}

	get( alias )
	{
		return this.loadedAssets[alias];
	}
}