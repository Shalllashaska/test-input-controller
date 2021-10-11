"use strict"

class InputController {

    enabled;
    focused;
    ACTION_ACTIVATED;
    ACTION_DEACTIVATED;
    _keys = [];


    constructor(actionsToBind, target) {
        this.actions = actionsToBind;
        this.elem = target;
    }

    bindActions(actionsToBind) {
        this.actions = Object.assign(this.actions, actionsToBind);
    }

    enableActions(actionName) {
        this.ACTION_ACTIVATED = actionName;
        this.actions[actionName].enabled = true;
    }

    disableActions(actionName) {
        this.ACTION_DEACTIVATED = actionName;
        this.actions[actionName].enabled = false;
    }

    isActionActive(action) {
        if(!this.enabled){ return false }
        else if(action in this.actions) {
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
        this.elem.addEventListener("keyup", (e)=>{
            this.keyUpInp(e);
        });
        this.elem.addEventListener("keydown", (e)=>{
            this.keyDownInp(e);
        });
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
        return this._keys[keyCode];
    }

    focus() {
        this.focused = true;
    }

    blur() {
        this.focused = false;
    }

    keyUpInp(e) {
        console.log(this._keys);
        this._keys[e.keyCode] = false;
    }

    keyDownInp(e) {
        this._keys[e.keyCode] = true;
    }

    detach() {
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
    "disLeft": {
        keys: [80],
        enabled: true,
    },
    "enLeft": {
        keys: [79],
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
    "disLeft": {
        keys: [80],
        enabled: true,
    },
};

let body = document.body;
let box = document.getElementById("box");
let inp = new InputController(actions1, body);
let left = 0;
let up = 0;
box.style.left = "0px";
box.style.top = "0px";
let step = 5;
inp.attach(inp.elem);

body.addEventListener("keydown", (e) => {
    if (inp.isActionActive("left")) {
        left -= step;
        let str = String(left) + "px";
        box.style.left = str;
    }
    if (inp.isActionActive("right")) {
        left += step;
        let str = String(left) + "px";
        box.style.left = str;
    }
    if (inp.isActionActive("up")) {
        up -= step;
        let str = String(up) + "px";
        box.style.top = str;
    }
    if (inp.isActionActive("down")) {
        up += step;
        let str = String(up) + "px";
        box.style.top = str;
    }
    if (inp.isActionActive("disLeft")) {
        inp.disableActions("left");
    }
    if (inp.isActionActive("enLeft")) {
        inp.detach();
    }
});




