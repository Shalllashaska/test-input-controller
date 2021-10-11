"use strict"

class InputController {

    enabled;
    focused;
    ACTION_ACTIVATED;
    ACTION_DEACTIVATED;
    _keys = [];
    attached = false;
    detached = false;
    keyboard = false;

    constructor(actionsToBind, target) {
        this.actions = actionsToBind;
        Object.keys(this.actions).forEach((e) =>{
            Object.keys(this.actions[e]).forEach((el)=>{
                if(e=="keys"){this.keyboard = true}
            });
        });
        console.log(this.keyboard);
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
        else if(!this.focused){ return false }
        else if(this.keyboard) {
            if (action in this.actions) {
                if (this.actions[action].enabled) {
                    for (let i = 0; i < this.actions[action].keys.length; i++) {
                        if (this.isKeyPressed(this.actions[action].keys[i])) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            }
            return false;
        }
        else return false;
    }

    attach(target, dontEnable){
        if(this.attached) { return }
        this.elem = target;
        this.elem.addEventListener("keyup", (e)=>{
            this.keyUpInp(e);
        });
        this.elem.addEventListener("keydown", (e)=>{
            this.keyDownInp(e);
        });
        window.addEventListener("focus", ()=>{
            this.focus();
        });
        window.addEventListener("blur", ()=>{
            this.blur();
        });
        if(dontEnable) {
            this.enabled = false;
            this.focused = false;
        }
        else {
            this.enabled = true;
            this.focused = true;
        }
        this.attached = true;
    }

    focus() {
        this.focused = true;
        console.log(this.focused);
    }

    blur() {
        this.focused = false;
        console.log(this.focused);
    }

    isKeyPressed(keyCode) {
        return this._keys[keyCode];
    }

    keyUpInp(e) {
        this._keys[e.keyCode] = false;
    }

    keyDownInp(e) {
        this._keys[e.keyCode] = true;
    }

    detach() {
        if(this.detached) return;
        this.elem.removeEventListener("keyup", (e)=>{
            this.keyUpInp(e);
        });
        this.elem.removeEventListener("keydown", (e)=>{
            this.keyDownInp(e);
        });
        this.elem = undefined;
        this.enabled = false;
        this.attached = false;
        window.removeEventListener("focus", this.focus);
        window.removeEventListener("blur", this.blur);
        this.detached = true;
    }
}







