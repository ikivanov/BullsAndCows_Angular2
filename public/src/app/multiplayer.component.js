"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var botPlayer_1 = require("./botPlayer");
var consts = require("./consts");
var MultiplayerComponent = (function () {
    function MultiplayerComponent() {
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
        this.initSocket();
        this.listGames();
    };
    MultiplayerComponent.prototype.initSocket = function () {
        var _this = this;
        this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });
        this.socket.on(consts.GAME_OVER_EVENT, function (data) {
            _this.onGameOver(data);
        });
        this.socket.on(consts.JOIN_GAME_SERVER_EVENT, function (data) {
            _this.onGameJoined(data);
        });
        this.socket.on(consts.PLAYER_TURN_SERVER_EVENT, function (data) {
            _this.onPlayerTurn(data);
        });
        this.socket.on(consts.GAME_STARTED_SERVER_EVENT, function (data) {
            _this.onGameStarted(data);
        });
        this.socket.on(consts.GUESS_NUMBER_SERVER_EVENT, function (data) {
            _this.onGuessNumber(data);
        });
    };
    MultiplayerComponent.prototype.listGames = function () {
        var _this = this;
        this.socket.emit(consts.LIST_GAMES_EVENT, { type: this.gameType }, function (data) { return _this.onGamesListed(data); });
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
        if (!this.socket) {
            this.initSocket();
        }
        this.socket.emit(consts.CREATE_GAME_EVENT, {
            name: args.gameName,
            nickname: args.nickname,
            type: this.gameType
        }, function (data) { return _this.onGameCreated(data); });
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
        if (!this.socket) {
            this.initSocket();
        }
        this.gameId = args.selectedGameId;
        this.nickname = args.nickname;
        this.socket.emit(consts.CHECK_NICKNAME_EXISTS_EVENT, {
            gameId: args.selectedGameId,
            nickname: args.nickname
        }, function (data) { return _this.onNicknameExistsResponse(data); });
    };
    MultiplayerComponent.prototype.onNicknameExistsResponse = function (data) {
        var _this = this;
        var exists = data.exists;
        if (exists) {
            alert(data.msg);
            return;
        }
        this.socket.emit(consts.JOIN_GAME_EVENT, {
            gameId: this.selectedGameId,
            nickname: this.nickname
        }, function (data) { return _this.onGameJoined(data); });
    };
    MultiplayerComponent.prototype.onGameJoined = function (data) {
        alert("onGameJoined");
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
        this.socket.emit(consts.LIST_GAME_PLAYERS_EVENT, {
            gameId: this.gameId,
            playerToken: this.playerToken
        }, function (data) { return _this.onPlayersListed(data); });
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
        var botSocket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true }), nickname = "botPlayer_" + new Date().getTime(), bot = new botPlayer_1.default(null, botSocket, this.gameId, nickname);
        bot.joinGame(this.gameId);
    };
    MultiplayerComponent.prototype.onStartGame = function () {
        var _this = this;
        this.socket.emit(consts.START_GAME_EVENT, {
            gameId: this.gameId,
            playerToken: this.playerToken
        }, function (data) { return _this.onGameStarted(data); });
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
        this.closeSocket();
    };
    MultiplayerComponent.prototype.onGuessNumber = function (data) {
        if (data.nickname === this.nickname) {
            return;
        }
        this.onGuessResponse(data);
    };
    MultiplayerComponent.prototype.onGuess = function (number) {
        var _this = this;
        this.socket.emit(consts.GUESS_NUMBER_EVENT, {
            gameId: this.gameId,
            playerToken: this.playerToken,
            number: number
        }, function (data) {
            _this.onGuessResponse(data);
            _this.isMyTurn = false;
        });
    };
    MultiplayerComponent.prototype.onGuessResponse = function (data) {
        var bulls = data.bulls, cows = data.cows, number = data.number;
        this.guesses.push(data.nickname + ": " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
    };
    MultiplayerComponent.prototype.closeSocket = function () {
        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.socket = null;
    };
    return MultiplayerComponent;
}());
MultiplayerComponent = __decorate([
    core_1.Component({
        selector: 'multiplayer',
        templateUrl: './multiplayer.component.html',
    })
], MultiplayerComponent);
exports.MultiplayerComponent = MultiplayerComponent;
//# sourceMappingURL=multiplayer.component.js.map