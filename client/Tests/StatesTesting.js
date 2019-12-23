// Nahom Abraha
let stateSwitcher = new StateSwitcher();
stateSwitcher.setStates(
    [
        new IntroState(),
        new AddNamesToPlayingState()
    ]
);

QUnit.test("StateTesting",function (assert) {
    assert.ok (stateSwitcher.getState(0).getName() == "IntroState", "Passed")
} );
QUnit.test("StateTesting",function (assert) {
    assert.ok (stateSwitcher.getState(1).getName() == "AddNameToPlayingState", "Passed")
} );
