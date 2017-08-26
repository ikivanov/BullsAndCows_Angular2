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
var MultiplayerStep1Component = (function () {
    function MultiplayerStep1Component() {
        this.selectedGameId = "";
        this.createGame = new core_1.EventEmitter();
        this.joinGame = new core_1.EventEmitter();
        this.nickname = "";
        this.gameName = "";
    }
    MultiplayerStep1Component.prototype.ngOnInit = function () {
    };
    MultiplayerStep1Component.prototype.onCreateGameBtnClicked = function () {
        this.createGame.emit({ gameName: this.gameName, nickname: this.nickname });
    };
    MultiplayerStep1Component.prototype.onJoinGameBtnClicked = function () {
        this.joinGame.emit({ selectedGameId: this.selectedGameId, nickname: this.nickname });
    };
    return MultiplayerStep1Component;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiplayerStep1Component.prototype, "selectedGameId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultiplayerStep1Component.prototype, "gamesList", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiplayerStep1Component.prototype, "createGame", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiplayerStep1Component.prototype, "joinGame", void 0);
MultiplayerStep1Component = __decorate([
    core_1.Component({
        selector: 'multiplayer-step1',
        templateUrl: './multiplayer-step1.component.html',
    })
], MultiplayerStep1Component);
exports.MultiplayerStep1Component = MultiplayerStep1Component;
//# sourceMappingURL=multiplayer-step1.component.js.map