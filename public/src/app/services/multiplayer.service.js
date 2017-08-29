"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var consts = require("../consts");
var backend_service_1 = require("./backend.service");
var MultiplayerService = (function (_super) {
    __extends(MultiplayerService, _super);
    function MultiplayerService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.joinGameEvent = new core_1.EventEmitter();
        _this.playerTurnEvent = new core_1.EventEmitter();
        _this.gameStartEvent = new core_1.EventEmitter();
        _this.guessNumberEvent = new core_1.EventEmitter();
        return _this;
    }
    MultiplayerService.prototype.ensureConnection = function () {
        var _this = this;
        _super.prototype.ensureConnection.call(this);
        this.socket.on(consts.JOIN_GAME_SERVER_EVENT, function (data) {
            _this.joinGameEvent.emit(data);
        });
        this.socket.on(consts.PLAYER_TURN_SERVER_EVENT, function (data) {
            _this.playerTurnEvent.emit(data);
        });
        this.socket.on(consts.GAME_STARTED_SERVER_EVENT, function (data) {
            _this.gameStartEvent.emit(data);
        });
        this.socket.on(consts.GUESS_NUMBER_SERVER_EVENT, function (data) {
            _this.guessNumberEvent.emit(data);
        });
    };
    MultiplayerService.prototype.createGame = function (gameName, nickname, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.CREATE_GAME_EVENT, {
                name: gameName,
                nickname: nickname,
                type: type
            }, function (data) { return resolve(data); });
        });
    };
    MultiplayerService.prototype.startGame = function (gameId, playerToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.START_GAME_EVENT, {
                gameId: gameId, playerToken: playerToken
            }, function (data) { return resolve(data); });
        });
    };
    MultiplayerService.prototype.joinGame = function (gameId, nickname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.JOIN_GAME_EVENT, { gameId: gameId, nickname: nickname }, function (data) { return resolve(data); });
        });
    };
    MultiplayerService.prototype.listGames = function (gameType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.LIST_GAMES_EVENT, { type: gameType }, function (data) {
                return resolve(data);
            });
        });
    };
    MultiplayerService.prototype.checkNicknameExists = function (gameId, nickname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.CHECK_NICKNAME_EXISTS_EVENT, { gameId: gameId, nickname: nickname }, function (data) { return resolve(data); });
        });
    };
    MultiplayerService.prototype.listPlayers = function (gameId, playerToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.LIST_GAME_PLAYERS_EVENT, {
                gameId: gameId, playerToken: playerToken
            }, function (data) { return resolve(data); });
        });
    };
    return MultiplayerService;
}(backend_service_1.BackendService));
MultiplayerService = __decorate([
    core_1.Injectable()
], MultiplayerService);
exports.MultiplayerService = MultiplayerService;
//# sourceMappingURL=multiplayer.service.js.map