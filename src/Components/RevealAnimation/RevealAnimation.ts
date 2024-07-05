import {Container} from "pixi.js";
import Animation from "../../engine/Animation/Animation";

class RevealAnimation extends Animation {
    constructor() {
        super({
            prefix: "reveal",
            endingFrame: 7,
            loop: false,
            speedModifier: 0.3
        });

        this.x = 33;
        this.y = 81;
    }
}

export default RevealAnimation;