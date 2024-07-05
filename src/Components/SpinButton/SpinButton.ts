import Button from "../../engine/Button/Button";

class SpinButton extends Button {
    constructor(buttonPayload:() => void) {
        super(buttonPayload, {
            active: global.game.SpinButton_Active,
            pressed: global.game.SpinButton_Pressed,
            inactive: global.game.SpinButton_Inactive
        });
        this.x = 292;
        this.y = 254;
    }
}

export default SpinButton;