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
var consts = require("./consts");
var botPlayer_js_1 = require("./botPlayer.js");
var computer_vs_computer_service_1 = require("./services/computer-vs-computer.service");
var ComputerVsComputerComponent = (function () {
    function ComputerVsComputerComponent(backendService) {
        this.backendService = backendService;
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
        var _this = this;
        this.backendService.gameOver.subscribe(function (data) {
            _this.onGameOver(data);
        });
    };
    ComputerVsComputerComponent.prototype.ngOnDestroy = function () {
        this.backendService.gameOver.unsubscribe();
        this.backendService.disconnect();
    };
    ComputerVsComputerComponent.prototype.onStartBtnClicked = function () {
        var _this = this;
        if (this.botPlayer) {
            this.botPlayer.dispose();
            this.botPlayer = null;
        }
        this.backendService.createGame(this.gameName, this.nickname, consts.SINGLE_PLAYER).then(function (data) {
            _this.onGameCreated(data);
        });
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
        this.backendService.startGame(this.gameId, this.playerToken).then(function (data) {
            var success = data.success;
            if (!success) {
                alert(data.msg);
                return;
            }
            _this.isRunning = true;
            _this.guesses = [];
        });
        this.botPlayer = new botPlayer_js_1.default(this, this.backendService, this.gameId, this.nickname, this.playerToken);
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
        this.backendService.disconnect();
    };
    return ComputerVsComputerComponent;
}());
ComputerVsComputerComponent = __decorate([
    core_1.Component({
        selector: 'computer-vs-computer',
        templateUrl: './computer-vs-computer.component.html',
        providers: [computer_vs_computer_service_1.ComputerVsComputerService]
    }),
    __metadata("design:paramtypes", [computer_vs_computer_service_1.ComputerVsComputerService])
], ComputerVsComputerComponent);
exports.ComputerVsComputerComponent = ComputerVsComputerComponent;
//# sourceMappingURL=computer-vs-computer.component.js.map