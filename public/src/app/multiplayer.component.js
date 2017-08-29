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
var botPlayer_1 = require("./botPlayer");
var consts = require("./consts");
var multiplayer_service_1 = require("./services/multiplayer.service");
var MultiplayerComponent = (function () {
    function MultiplayerComponent(backendService) {
        this.backendService = backendService;
        this.step = 0;
        this.isGameOver = false;
        this.isRunning = false;
        this.nickname = "";
        this.guesses = [];
        this.gameName = "";
        this.selectedGameId = "";
        this.isMyTurn = false;
        this.gamesList = [];
        this.gamePlayers = [];
        this.gameType = consts.MULTIPLAYER;
        this.gameId = "";
        this.playerToken = "";
        this.isGameCreator = false;
        this.bots = [];
    }
    MultiplayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.backendService.gameOver.subscribe(function (data) {
            _this.onGameOver(data);
        });
        this.backendService.joinGameEvent.subscribe(function (data) {
            _this.onGameJoined(data);
        });
        this.backendService.playerTurnEvent.subscribe(function (data) {
            _this.onPlayerTurn(data);
        });
        this.backendService.gameStartEvent.subscribe(function (data) {
            _this.onGameStarted(data);
        });
        this.backendService.guessNumberEvent.subscribe(function (data) {
            _this.onGuessNumber(data);
        });
        this.backendService.ensureConnection();
        this.backendService.listGames(this.gameType).then(function (data) { return _this.onGamesListed(data); });
    };
    MultiplayerComponent.prototype.ngOnDestroy = function () {
        this.backendService.gameOver.unsubscribe();
        this.backendService.joinGameEvent.unsubscribe();
        this.backendService.playerTurnEvent.unsubscribe();
        this.backendService.gameStartEvent.unsubscribe();
        this.backendService.guessNumberEvent.unsubscribe();
        this.backendService.disconnect();
    };
    MultiplayerComponent.prototype.onGamesListed = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.gamesList = data.gamesList;
        if (data.gamesList && data.gamesList.length > 0) {
            this.selectedGameId = data.gamesList[0].id;
        }
    };
    MultiplayerComponent.prototype.onCreateGame = function (args) {
        var _this = this;
        this.nickname = args.nickname,
            this.gameName = args.gameName;
        this.backendService.createGame(this.gameName, this.nickname, this.gameType)
            .then(function (data) { return _this.onGameCreated(data); });
    };
    MultiplayerComponent.prototype.onGameCreated = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.gameId = data.gameId;
        this.playerToken = data.playerToken;
        this.isGameCreator = true;
        this.listPlayers();
        this.step = 1;
    };
    MultiplayerComponent.prototype.onJoinGame = function (args) {
        var _this = this;
        this.gameId = args.selectedGameId;
        this.nickname = args.nickname;
        debugger;
        this.backendService.checkNicknameExists(args.selectedGameId, args.nickname)
            .then(function (data) { return _this.onNicknameExistsResponse(data); });
    };
    MultiplayerComponent.prototype.onNicknameExistsResponse = function (data) {
        var _this = this;
        debugger;
        var exists = data.exists;
        if (exists) {
            alert(data.msg);
            return;
        }
        this.backendService.joinGame(this.selectedGameId, this.nickname)
            .then(function (data) { return _this.onGameJoined(data); });
    };
    MultiplayerComponent.prototype.onGameJoined = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        if (this.nickname == data.nickname) {
            this.gameId = data.gameId;
            this.playerToken = data.playerToken;
            this.step = 2;
        }
        else {
            if (this.isGameCreator) {
                this.listPlayers();
            }
        }
    };
    MultiplayerComponent.prototype.listPlayers = function () {
        var _this = this;
        this.backendService.listPlayers(this.gameId, this.playerToken)
            .then(function (data) { return _this.onPlayersListed(data); });
    };
    MultiplayerComponent.prototype.onPlayersListed = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.gamePlayers = data.players;
    };
    MultiplayerComponent.prototype.onAddBot = function () {
        throw new Error("Not implemented");
        var botSocket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true }), nickname = "botPlayer_" + new Date().getTime(), bot = new botPlayer_1.default(null, botSocket, this.gameId, nickname);
        bot.joinGame(this.gameId);
    };
    MultiplayerComponent.prototype.onStartGame = function () {
        var _this = this;
        this.backendService.startGame(this.gameId, this.playerToken)
            .then(function (data) { return _this.onGameStarted(data); });
    };
    MultiplayerComponent.prototype.onGameStarted = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.isRunning = true;
        this.guesses = [];
        this.step = 2;
    };
    MultiplayerComponent.prototype.onPlayerTurn = function (data) {
        if (data.nickname == this.nickname) {
            this.isMyTurn = true;
        }
    };
    MultiplayerComponent.prototype.onGameOver = function (data) {
        var winStr = data.win ? "win" : "lose", result = "Game over! You " + winStr + "! Number is: " + data.number.join('');
        this.guesses.push(result);
        this.isGameOver = true;
        this.isRunning = false;
        this.gameId = "";
        this.backendService.disconnect();
    };
    MultiplayerComponent.prototype.onGuessNumber = function (data) {
        if (data.nickname === this.nickname) {
            return;
        }
        this.onGuessResponse(data);
    };
    MultiplayerComponent.prototype.onGuess = function (number) {
        var _this = this;
        this.backendService.guessNumber(this.gameId, this.playerToken, number).then(function (data) {
            _this.onGuessResponse(data);
            _this.isMyTurn = false;
        });
    };
    MultiplayerComponent.prototype.onGuessResponse = function (data) {
        var bulls = data.bulls, cows = data.cows, number = data.number;
        this.guesses.push(data.nickname + ": " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
    };
    return MultiplayerComponent;
}());
MultiplayerComponent = __decorate([
    core_1.Component({
        selector: 'multiplayer',
        templateUrl: './multiplayer.component.html',
        providers: [multiplayer_service_1.MultiplayerService]
    }),
    __metadata("design:paramtypes", [multiplayer_service_1.MultiplayerService])
], MultiplayerComponent);
exports.MultiplayerComponent = MultiplayerComponent;
//# sourceMappingURL=multiplayer.component.js.map