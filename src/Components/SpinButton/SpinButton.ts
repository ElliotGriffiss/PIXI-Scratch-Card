import Button from "../../engine/Button/Button";

class SpinButton extends Button {
    constructor(buttonPayload:() => void) {
        super(buttonPayload, {
            active: global.game.ButtonActive,
            pressed: global.game.ButtonPressed,
            inactive: global.game.ButtonInactive
        });
        this.x = 292;
        this.y = 254;
    }
}

export default SpinButton;