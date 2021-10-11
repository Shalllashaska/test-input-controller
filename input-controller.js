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
    "scale+": {
        keys: [221],
        enabled: true,
    },
    "scale-": {
        keys: [219],
        enabled: true,
    },
};

let body = document.body;
let box = document.getElementById("box");
let inp = new InputController(actions1, body);
let left = 100;
let up = 100;
box.style.left = "100px";
box.style.top = "100px";
let step = 5;
let scaleStep = 0.1;
let scale = 1;
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
    if (inp.isActionActive("scale+")) {
        scale += scaleStep;
        box.style.transform = "scale("+scale+")";
    }
    if (inp.isActionActive("scale-")) {
        scale -= scaleStep;
        box.style.transform = "scale("+scale+")";
    }
});

function attachFunc() {
    inp.attach(body);
}
function detachFunc() {
    inp.detach();
}
function disableLeft(){
    inp.disableActions("left");
}
function disableRight(){
    inp.disableActions("right");
}
function disableUp(){
    inp.disableActions("up");
}
function disableDown(){
    inp.enableActions("down");
}
function enableLeft(){
    inp.enableActions("left");
}
function enableRight(){
    inp.enableActions("right");
}
function enableUp(){
    inp.enableActions("up");
}
function enableDown(){
    inp.enableActions("down");
}

function bindScaleButt(){
    inp.bindActions(actions2);
}






