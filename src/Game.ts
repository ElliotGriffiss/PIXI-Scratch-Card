import {Container, Sprite, Text} from "pixi.js";
import {sound} from '@pixi/sound';
import gsap from "gsap";

import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";
import Timings from "./engine/Utils/Timings/Timings";

class Game extends Container{
    constructor() {
        super();
    }
}

export default Game;