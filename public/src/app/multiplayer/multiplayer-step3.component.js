"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var MultiplayerStep3Component = (function () {
    function MultiplayerStep3Component() {
        this.isGameOver = false;
        this.isRunning = false;
        this.isMyTurn = false;
        this.guesses = [];
        this.guess = new core_1.EventEmitter();
    }
    MultiplayerStep3Component.prototype.ngOnInit = function () {
    };
    MultiplayerStep3Component.prototype.onGuess = function (number) {
        this.guess.emit(number);
    };
    return MultiplayerStep3Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiplayerStep3Component.prototype, "isGameOver", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiplayerStep3Component.prototype, "isRunning", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultiplayerStep3Component.prototype, "isMyTurn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultiplayerStep3Component.prototype, "guesses", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiplayerStep3Component.prototype, "guess", void 0);
MultiplayerStep3Component = __decorate([
    core_1.Component({
        selector: 'multiplayer-step3',
        templateUrl: './multiplayer-step3.component.html',
    })
], MultiplayerStep3Component);
exports.MultiplayerStep3Component = MultiplayerStep3Component;
//# sourceMappingURL=multiplayer-step3.component.js.map