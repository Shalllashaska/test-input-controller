"use strict"

class InputController {

    enabled;
    focused;
    ACTION_ACTIVATED;
    ACTION_DEACTIVATED;
    keys = [];
    currentKeyDown;
    currentKeyUp;


    constructor(actionsToBind, target) {
        this.actions = actionsToBind;
        this.elem = target;
    }

    bindActions(actionsToBind) {
        this.actions = Object.assign(this.actions, actionsToBind);
    }

    enableActions(actionName) {
        this.actions[actionName].enabled = true;
    }

    disableActions(actionName) {
        this.actions[actionName].enabled = false;
    }

    isActionActive(action) {
        if(action in this.actions) {
            if(this.actions[action].enabled) {
                for (let i = 0; i < this.actions[action].keys.length; i++) {
                    if (this.isKeyPressed(this.actions[action].keys[i])) {
                        return true;
                    }
                }
            }
            else {
                return false;
            }
        }
        return false;
    }

    attach(target, dontEnable){
        this.elem = target;
        this.elem.addEventListener("keyup", this.keyUp);
        this.elem.addEventListener("keydown", this.keyDown);
        window.addEventListener("focus", this.focus);
        window.addEventListener("blur", this.blur);
        if(dontEnable) {
            this.enabled = false;
            this.focused = false;
        }
        else {
            this.enabled = true;
            this.focused = true;
        }
    }

    isKeyPressed(keyCode) {
        console.log(this.currentKeyDown);
        if(this.currentKeyDown == keyCode) {

            return true;
        }
        else {
            return false;
        }
    }

    focus() {
        this.focused = true;
    }

    blur() {
        this.focused = false;
    }

    keyUp(e) {
        this.currentKeyUp = e.keyCode;
    }

    keyDown(e) {
        this.currentKeyDown = e.keyCode;
    }

    detach() {
        this.elem.removeEventListener("keyup", this.keyUp);
        this.elem.removeEventListener("keydown", this.keyDown);
        this.elem = undefined;
        this.enabled = false;
        window.removeEventListener("focus", this.focus);
        window.removeEventListener("blur", this.blur);
    }
}

let actions1 = {
    "left": {
        keys: [37, 65],
        enabled: true,
    },
    "right": {
        keys: [39, 68],
        enabled: true,
    },
    "up": {
        keys: [38, 87],
        enabled: true,
    },
    "down": {
        keys: [40, 83],
        enabled: true,
    },
};

let actions2 = {
    "left": {
        keys: [100, 65],
        enabled: true,
    },
    "right": {
        keys: [102, 68],
        enabled: true,
    },
    "up": {
        keys: [104, 87],
        enabled: true,
    },
    "down": {
        keys: [98, 83],
        enabled: true,
    },
};

let body = document.body;
let box = document.getElementById("box");
let inp = new InputController(actions1, body);
let left = 0;
let up = 0;
let step = 5;
inp.attach(inp.elem);

body.addEventListener("keydown", (e) => {
    console.log(e);
    if(inp.isActionActive("left")){
        left += step;
        let str = String(left) + "px";
        box.style.left = str;
    }
    if(inp.isActionActive("right")){
        left -= step;
        let str = String(left) + "px";
        box.style.left = String(left);
    }
    if(inp.isActionActive("up")){
        up -= step;
        let str = String(up) + "px";
        box.style.top = String(up);
    }
    if(inp.isActionActive("down")){
        up += step;
        let str = String(up) + "px";
        box.style.top = String(up);
    }
});




