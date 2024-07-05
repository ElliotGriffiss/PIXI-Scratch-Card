import {Container, Sprite, Text} from "pixi.js";
import {sound} from '@pixi/sound';
import gsap from "gsap";

import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";
import Timings from "./engine/Utils/Timings/Timings";

import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Bonus from "./Components/Bonus/Bonus";

class Game extends Container{

    constructor() {
        super();

        const background = new Background();
        const symbolManager = new SymbolManager();
        const bonus = new Bonus();

        this.addChild(
            background,
            symbolManager,
            bonus
        );
    }
}

export default Game;