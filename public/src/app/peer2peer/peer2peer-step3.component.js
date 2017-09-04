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
var Peer2PeerStep3Component = (function () {
    function Peer2PeerStep3Component() {
        this.isGameOver = false;
        this.isRunning = false;
        this.isMyTurn = false;
        this.guesses = [];
        this.opponentGuesses = [];
        this.guess = new core_1.EventEmitter();
    }
    Peer2PeerStep3Component.prototype.ngOnInit = function () {
    };
    Peer2PeerStep3Component.prototype.onGuess = function (number) {
        this.guess.emit(number);
    };
    return Peer2PeerStep3Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Peer2PeerStep3Component.prototype, "isGameOver", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Peer2PeerStep3Component.prototype, "isRunning", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Peer2PeerStep3Component.prototype, "isMyTurn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], Peer2PeerStep3Component.prototype, "guesses", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], Peer2PeerStep3Component.prototype, "opponentGuesses", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Peer2PeerStep3Component.prototype, "guess", void 0);
Peer2PeerStep3Component = __decorate([
    core_1.Component({
        selector: 'peer2peer-step3',
        templateUrl: './peer2peer-step3.component.html',
    })
], Peer2PeerStep3Component);
exports.Peer2PeerStep3Component = Peer2PeerStep3Component;
//# sourceMappingURL=peer2peer-step3.component.js.map