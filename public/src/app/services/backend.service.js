"use strict";
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var consts = require("../consts");
var BackendService = (function () {
    function BackendService() {
        this.gameOver = new core_1.EventEmitter();
    }
    BackendService.prototype.ensureConnection = function () {
        var _this = this;
        if (this.socket) {
            return;
        }
        this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });
        this.socket.on(consts.GAME_OVER_EVENT, function (data) {
            _this.gameOver.emit(data);
        });
    };
    BackendService.prototype.disconnect = function () {
        if (!this.socket)
            return;
        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.socket = null;
    };
    BackendService.prototype.createGame = function (gameName, nickname, gameType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.ensureConnection();
            _this.socket.emit(consts.CREATE_GAME_EVENT, {
                name: gameName,
                nickname: nickname,
                type: gameType
            }, function (data) {
                resolve(data);
            });
        });
    };
    BackendService.prototype.startGame = function (gameId, playerToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.START_GAME_EVENT, {
                gameId: gameId,
                playerToken: playerToken
            }, function (data) {
                resolve(data);
            });
        });
    };
    BackendService.prototype.guessNumber = function (gameId, playerToken, number) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.GUESS_NUMBER_EVENT, {
                gameId: gameId,
                playerToken: playerToken,
                number: number
            }, function (data) {
                resolve(data);
            });
        });
    };
    return BackendService;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map