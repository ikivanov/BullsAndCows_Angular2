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
var human_vs_computer_service_1 = require("./services/human-vs-computer.service");
var HumanVsComputerComponent = (function () {
    function HumanVsComputerComponent(backendService) {
        this.backendService = backendService;
        this.isRunning = false;
        this.guesses = [];
    }
    HumanVsComputerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.backendService.gameOver.subscribe(function (data) {
            _this.onGameOver(data);
        });
    };
    HumanVsComputerComponent.prototype.ngOnDestroy = function () {
        this.backendService.gameOver.unsubscribe();
        this.backendService.disconnect();
    };
    HumanVsComputerComponent.prototype.onStartBtnClicked = function () {
        var _this = this;
        this.backendService.createGame(("h_vs_c" + new Date().getTime()), "guest", consts.SINGLE_PLAYER).then(function (data) {
            _this.onGameCreated(data);
        });
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
        this.backendService.startGame(this.gameId, this.playerToken).then(function (data) {
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
        this.backendService.surrenderGame(this.gameId, this.playerToken).then(function (data) {
            if (!data.success) {
                alert(data.msg);
            }
        });
        this.isRunning = false;
    };
    HumanVsComputerComponent.prototype.onGuess = function (number) {
        var _this = this;
        this.backendService.guessNumber(this.gameId, this.playerToken, number).then(function (data) {
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
        this.backendService.disconnect();
    };
    return HumanVsComputerComponent;
}());
HumanVsComputerComponent = __decorate([
    core_1.Component({
        selector: 'human-vs-computer',
        templateUrl: './human-vs-computer.component.html',
        providers: [human_vs_computer_service_1.HumanVsComputerService]
    }),
    __metadata("design:paramtypes", [human_vs_computer_service_1.HumanVsComputerService])
], HumanVsComputerComponent);
exports.HumanVsComputerComponent = HumanVsComputerComponent;
//# sourceMappingURL=human-vs-computer.component.js.map