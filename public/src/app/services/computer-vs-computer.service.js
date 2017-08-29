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
var ComputerVsComputerService = (function (_super) {
    __extends(ComputerVsComputerService, _super);
    function ComputerVsComputerService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerTurn = new core_1.EventEmitter();
        return _this;
    }
    ComputerVsComputerService.prototype.ensureConnection = function () {
        var _this = this;
        _super.prototype.ensureConnection.call(this);
        this.socket.on(consts.PLAYER_TURN_SERVER_EVENT, function (data) {
            _this.playerTurn.emit(data);
        });
    };
    ComputerVsComputerService.prototype.joinGame = function (gameId, nickname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(consts.JOIN_GAME_EVENT, {
                gameId: gameId,
                nickname: nickname
            }, function (data) {
                resolve(data);
            });
        });
    };
    return ComputerVsComputerService;
}(backend_service_1.BackendService));
ComputerVsComputerService = __decorate([
    core_1.Injectable()
], ComputerVsComputerService);
exports.ComputerVsComputerService = ComputerVsComputerService;
//# sourceMappingURL=computer-vs-computer.service.js.map