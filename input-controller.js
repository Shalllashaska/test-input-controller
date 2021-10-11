"use strict"

class InputController {

    enabled;
    focused;
    ACTION_ACTIVATED;
    ACTION_DEACTIVATED;

    _keys;

    constructor(actionsToBind, target) {
        this.actions = actionsToBind;
        this.elem = target;
    }

    bindActions(actionsToBind) {
        this.actions = Object.assign(this.actions, actionsToBind);
    }

    enableActions(actionName) {
        console.log(actionName);
        if(this.isActionActive(actionName)) {
            this.actions[actionName].enabled = true;
        }
        else {
            return false;
        }
    }

    disableActions(actionName) {
        if(!this.isActionActive(actionName)) {
            this.actions[actionName].enabled = false;
        }
        else {
            return false;
        }
    }

    isActionActive(action) {
        if(action in this.actions) {
            for (let i = 0; i < this.actions[action].keys.length; i++){
                if(this.isKeyPressed(this.actions[action].keys[i])) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    attach(target, dontEnable){
        this.elem = target;
        console.log(this.elem);
        this.elem.addEventListener("keyup", this.keyUp, false);
        this.elem.addEventListener("keydown", this.keyDown, false);
        if(dontEnable) {
            this.enabled = false;
        }
        else {
            this.enabled = true;
        }
    }

    isKeyPressed(keyCode) {
        if(this._keys[keyCode]) {
            return true;
        }
        else {
            return false;
        }
    }

    focus() {
        this.focused = true;
        console.log(this.focused);
    }

    blur() {
        this.focused = false;
        console.log(this.focused);
    }

    keyUp(e) {
        console.log(e);
    }

    keyDown(e) {
        console.log(e);
    }

    detach() {
        this.elem = undefined;
        this.enabled = false;
    }
}

let actions = {
    "left": {
        keys: [37, 65],
        enabled: false,
    },
    "right": {
        keys: [39, 68],
        enabled: false,
    },
    "up": {
        keys: [38, 87],
        enabled: false,
    },
    "down": {
        keys: [40, 83],
        enabled: false,
    },
};

let cube = document.getElementById("box");
let inp = new InputController(actions, cube);

inp.attach(inp.elem);
console.log(inp);
