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
var Peer2PeerStep2Component = (function () {
    function Peer2PeerStep2Component() {
        this.gameName = "";
        this.gamePlayers = [];
        this.startGame = new core_1.EventEmitter();
    }
    Peer2PeerStep2Component.prototype.ngOnInit = function () {
    };
    Peer2PeerStep2Component.prototype.onStartGameBtnClicked = function () {
        this.startGame.emit();
    };
    return Peer2PeerStep2Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Peer2PeerStep2Component.prototype, "gameName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], Peer2PeerStep2Component.prototype, "gamePlayers", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Peer2PeerStep2Component.prototype, "startGame", void 0);
Peer2PeerStep2Component = __decorate([
    core_1.Component({
        selector: 'peer2peer-step2',
        templateUrl: './peer2peer-step2.component.html',
    })
], Peer2PeerStep2Component);
exports.Peer2PeerStep2Component = Peer2PeerStep2Component;
//# sourceMappingURL=peer2peer-step2.component.js.map