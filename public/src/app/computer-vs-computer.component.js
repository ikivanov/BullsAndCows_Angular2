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
var io = require("socket.io-client");
var consts = require("./consts");
var botPlayer_js_1 = require("./botPlayer.js");
var ComputerVsComputerComponent = (function () {
    function ComputerVsComputerComponent() {
        this.isRunning = false;
        this.guesses = [];
        this.nickname = "h_vs_c_" + new Date().getTime();
        this.gameName = "computerVsComputer_" + new Date().getTime();
        this.gameType = consts.SINGLE_PLAYER;
        this.gameId = "";
        this.playerToken = "";
        this.botPlayer = null;
    }
    ComputerVsComputerComponent.prototype.ngOnInit = function () {
        this.initSocket();
    };
    ComputerVsComputerComponent.prototype.initSocket = function () {
        var _this = this;
        this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });
        this.socket.on(consts.GAME_OVER_EVENT, function (data) {
            _this.onGameOver(data);
        });
    };
    ComputerVsComputerComponent.prototype.closeSocket = function () {
        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.socket = null;
    };
    ComputerVsComputerComponent.prototype.onStartBtnClicked = function () {
        var _this = this;
        this.botPlayer = null;
        if (!this.socket) {
            this.initSocket();
        }
        this.socket.emit(consts.CREATE_GAME_EVENT, {
            name: this.gameName,
            nickname: this.nickname,
            type: this.gameType
        }, function (data) { _this.onGameCreated(data); });
    };
    ComputerVsComputerComponent.prototype.onGameCreated = function (data) {
        var _this = this;
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.gameId = data.gameId;
        this.playerToken = data.playerToken;
        this.socket.emit(consts.START_GAME_EVENT, {
            gameId: this.gameId,
            playerToken: this.playerToken
        }, function (data) {
            var success = data.success;
            if (!success) {
                alert(data.msg);
                return;
            }
            _this.isRunning = true;
            _this.guesses = [];
        });
        this.botPlayer = new botPlayer_js_1.default(this, this.socket, this.gameId, this.nickname, this.playerToken);
    };
    ComputerVsComputerComponent.prototype.onGuessResponse = function (data) {
        var bulls = data.bulls, cows = data.cows, number = data.number;
        this.guesses.push("number: " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
    };
    ComputerVsComputerComponent.prototype.onGameOver = function (data) {
        var winStr = data.win ? "win" : "lose", result = "Game over! You " + winStr + "! Number is: " + data.number.join('');
        this.guesses.push(result);
        this.isRunning = false;
        this.gameId = "";
        this.closeSocket();
    };
    return ComputerVsComputerComponent;
}());
ComputerVsComputerComponent = __decorate([
    core_1.Component({
        selector: 'computer-vs-computer',
        templateUrl: './computer-vs-computer.component.html',
    }),
    __metadata("design:paramtypes", [])
], ComputerVsComputerComponent);
exports.ComputerVsComputerComponent = ComputerVsComputerComponent;
//# sourceMappingURL=computer-vs-computer.component.js.map