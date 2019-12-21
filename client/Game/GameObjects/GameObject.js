class GameObject
{
	constructor(
		positionVector,
		velocityVector
	) {
		this.positionVector = positionVector;
		this.velocityVector = velocityVector;
		this.accelerationVector = new p5.Vector(0, 0);
	}

	/**
	 * Get position vector.
	 *
	 * @return Vector.
	 */
	getPositionVector()
	{
		return this.positionVector;
	}

	/**
	 * Set position vector.
	 *
	 * @param Vector positionVector.
	 */
	setPositionVector( positionVector )
	{
		this.positionVector = positionVector;
	}

	/**
	 * Get velocity vector.
	 *
	 * @return Vector.
	 */
	getVelocityVector()
	{
		return this.velocityVector;
	}

	/**
	 * Set velocity vector.
	 *
	 * @param Vector velocityVector.
	 */
	setVelocityVector( velocityVector )
	{
		this.velocityVector = velocityVector;
	}

	/**
	 * Get acceleration vector.
	 *
	 * @return Vector.
	 */
	getAccelerationVector()
	{
		return this.accelerationVector;
	}

	/**
	 * Set acceleration vector.
	 *
	 * @param Vector accelerationVector
	 */
	setAccelerationVector( accelerationVector )
	{
		this.accelerationVector = accelerationVector;
	}
}