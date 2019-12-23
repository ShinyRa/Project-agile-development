/**
 * Stateswitcher tests
 *
 * @author Tijs de Graaff
 */
let stateSwitcher = new StateSwitcher();
stateSwitcher.setStates(
	[
		'test1',
		'test2',
		'test3'
	]
);

QUnit.test("StateSwitcher get states", function( assert ) {
	assert.ok(stateSwitcher.getStates().length == 3, "Passed!");
});

QUnit.test("StateSwitcher get state", function( assert ) {
	assert.ok(stateSwitcher.getState(0) == "test1", "Passed!");
});
