"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var consts = require("./consts");
var HumanVsComputerComponent = (function () {
    function HumanVsComputerComponent() {
        this.isRunning = false;
        this.guesses = [];
    }
    HumanVsComputerComponent.prototype.ngOnInit = function () {
        this.initSocket();
    };
    HumanVsComputerComponent.prototype.initSocket = function () {
        var _this = this;
        this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });
        this.socket.on(consts.GAME_OVER_EVENT, function (data) {
            _this.onGameOver(data);
        });
    };
    HumanVsComputerComponent.prototype.closeSocket = function () {
        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.socket = null;
    };
    HumanVsComputerComponent.prototype.onStartBtnClicked = function () {
        var _this = this;
        if (!this.socket) {
            this.initSocket();
        }
        this.socket.emit(consts.CREATE_GAME_EVENT, {
            name: ("h_vs_c" + new Date().getTime()),
            nickname: "guest",
            type: consts.SINGLE_PLAYER
        }, function (data) { _this.onGameCreated(data); });
    };
    HumanVsComputerComponent.prototype.onGameCreated = function (data) {
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
    };
    HumanVsComputerComponent.prototype.onSurrenderBtnClicked = function () {
        this.socket.emit(consts.SURRENDER_GAME_EVENT, {
            gameId: this.gameId,
            playerToken: this.playerToken
        }, function (data) {
            if (!data.success) {
                alert(data.msg);
            }
        });
        this.isRunning = false;
    };
    HumanVsComputerComponent.prototype.onGuess = function (number) {
        var _this = this;
        this.socket.emit(consts.GUESS_NUMBER_EVENT, {
            gameId: this.gameId,
            playerToken: this.playerToken,
            number: number
        }, function (data) {
            _this.onGuessResponse(data);
        });
    };
    HumanVsComputerComponent.prototype.onGuessResponse = function (data) {
        var bulls = data.bulls, cows = data.cows, number = data.number;
        this.guesses.push("number: " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
    };
    HumanVsComputerComponent.prototype.onGameOver = function (data) {
        var winStr = data.win ? "win" : "lose", result = "Game over! You " + winStr + "! Number is: " + data.number.join('');
        this.guesses.push(result);
        this.isRunning = false;
        this.gameId = "";
        this.closeSocket();
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