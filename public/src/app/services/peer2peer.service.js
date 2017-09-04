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
var multiplayer_service_1 = require("./multiplayer.service");
var Peer2PeerService = (function (_super) {
    __extends(Peer2PeerService, _super);
    function Peer2PeerService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guessPeerIncommingQueryEvent = new core_1.EventEmitter();
        _this.guessPeerNumberResponseEvent = new core_1.EventEmitter();
        _this.gameOverPeerEvent = new core_1.EventEmitter();
        return _this;
    }
    Peer2PeerService.prototype.ensureConnection = function () {
        var _this = this;
        _super.prototype.ensureConnection.call(this);
        this.socket.on(consts.GUESS_PEER_NUMBER_SERVER_EVENT, function (data) {
            _this.guessPeerIncommingQueryEvent.emit(data);
        });
        this.socket.on(consts.GUESS_PEER_NUMBER_RESPONSE_EVENT, function (data) {
            _this.guessPeerNumberResponseEvent.emit(data);
        });
        this.socket.on(consts.GAME_OVER_PEER_SERVER_EVENT, function (data) {
            _this.gameOverPeerEvent.emit(data);
        });
    };
    Peer2PeerService.prototype.fireGuessPeerNumberClientResponse = function (gameId, playerToken, nickname, success, number, bulls, cows) {
        this.socket.emit(consts.GUESS_PEER_NUMBER_CLIENT_RESPONSE_EVENT, {
            gameId: gameId,
            playerToken: playerToken,
            nickname: nickname,
            success: success,
            number: number,
            bulls: bulls,
            cows: cows
        });
    };
    Peer2PeerService.prototype.fireGameOver = function (gameId, playerToken, nickname, number, success) {
        this.socket.emit(consts.GAME_OVER_PEER_CLIENT_EVENT, {
            gameId: gameId,
            playerToken: playerToken,
            nickname: nickname,
            number: number,
            success: success
        });
    };
    Peer2PeerService.prototype.guessPeerNumber = function (gameId, playerToken, number) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.GUESS_PEER_NUMBER_EVENT, {
                gameId: gameId,
                playerToken: playerToken,
                number: number
            }, function (data) {
                if (data.success) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            });
        });
    };
    return Peer2PeerService;
}(multiplayer_service_1.MultiplayerService));
Peer2PeerService = __decorate([
    core_1.Injectable()
], Peer2PeerService);
exports.Peer2PeerService = Peer2PeerService;
//# sourceMappingURL=peer2peer.service.js.map