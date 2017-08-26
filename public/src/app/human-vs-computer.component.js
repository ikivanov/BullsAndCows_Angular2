"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var HumanVsComputerComponent = (function () {
    function HumanVsComputerComponent() {
        this.isRunning = false;
        this.guesses = [];
    }
    HumanVsComputerComponent.prototype.onStartBtnClicked = function () {
        this.isRunning = true;
    };
    HumanVsComputerComponent.prototype.onSurrenderBtnClicked = function () {
        this.isRunning = false;
    };
    HumanVsComputerComponent.prototype.onGuess = function (number) {
        this.guesses.push("number: 1234, bulls: 0, cows: 1");
    };
    return HumanVsComputerComponent;
}());
HumanVsComputerComponent = __decorate([
    core_1.Component({
        selector: 'human-vs-computer',
        templateUrl: './human-vs-computer.component.html',
    })
], HumanVsComputerComponent);
exports.HumanVsComputerComponent = HumanVsComputerComponent;
//# sourceMappingURL=human-vs-computer.component.js.map