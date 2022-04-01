class Input {
    constructor() {
        this.keys = [];
        this.mousePosition = { x: 0, y: 0 };
        //----Controls----
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values <-- for key codes
        let self = this;
        document.addEventListener("keydown", function (event) {
            self.keys[event.code] = true;
        });
        document.addEventListener("keyup", function (event) {
            self.keys[event.code] = false;
        });
        canvas.addEventListener("mousemove", function (event) {
            self.mousePosition = { x: event.clientX, y: event.clientY };
        });
        //----------------
    }
}
;
//# sourceMappingURL=Input.js.map