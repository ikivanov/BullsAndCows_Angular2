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
var peer2peer_service_1 = require("./services/peer2peer.service");
var Peer2PeerComponent = (function () {
    function Peer2PeerComponent(backendService) {
        this.backendService = backendService;
        this.step = 0;
        this.isGameOver = false;
        this.isRunning = false;
        this.nickname = "";
        this.gameName = "";
        this.guesses = [];
        this.opponentGuesses = [];
        this.isMyTurn = false;
        this.gamesList = [];
        this.secretNumber = "";
        this.gamePlayers = [];
        this.selectedGameId = "";
        this.gameType = consts.PEER_2_PEER;
        this.gameId = "";
        this.playerToken = "";
        this.isGameCreator = false;
    }
    Peer2PeerComponent.prototype.ngOnInit = function () {
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
        this.backendService.guessPeerIncommingQueryEvent.subscribe(function (data) {
            _this.onGuessPeerIncommingQuery(data);
        });
        this.backendService.guessPeerNumberResponseEvent.subscribe(function (data) {
            _this.onGuessPeerNumberResponse(data);
        });
        this.backendService.gameOverPeerEvent.subscribe(function (data) {
            _this.onGameOverPeer(data);
        });
        this.backendService.ensureConnection();
        this.backendService.listGames(this.gameType).then(function (data) { return _this.onGamesListed(data); });
    };
    Peer2PeerComponent.prototype.ngOnDestroy = function () {
        this.backendService.gameOver.unsubscribe();
        this.backendService.joinGameEvent.unsubscribe();
        this.backendService.playerTurnEvent.unsubscribe();
        this.backendService.gameStartEvent.unsubscribe();
        this.backendService.guessNumberEvent.unsubscribe();
        this.backendService.guessPeerIncommingQueryEvent.unsubscribe();
        this.backendService.guessPeerNumberResponseEvent.unsubscribe();
        this.backendService.gameOverPeerEvent.unsubscribe();
        this.backendService.disconnect();
    };
    Peer2PeerComponent.prototype.onCreateGame = function (args) {
        var _this = this;
        this.nickname = args.nickname,
            this.gameName = args.gameName;
        this.secretNumber = args.secretNumber;
        this.backendService.createGame(this.gameName, this.nickname, this.gameType)
            .then(function (data) { return _this.onGameCreated(data); });
    };
    Peer2PeerComponent.prototype.onGameCreated = function (data) {
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
    Peer2PeerComponent.prototype.onStartGame = function () {
        var _this = this;
        this.backendService.startGame(this.gameId, this.playerToken)
            .then(function (data) { return _this.onGameStarted(data); });
    };
    Peer2PeerComponent.prototype.onGamesListed = function (data) {
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
    Peer2PeerComponent.prototype.onGameOver = function (data) {
        var nickname = data.nickname, result = "Game over! ";
        if (nickname != this.nickname) {
            result += "You win! Number is: " + data.number.join('');
            ;
        }
        else {
            result += "You lose! Your opponent guessed your secret number!";
        }
        this.guesses.push(result);
        this.isGameOver = true;
        this.isRunning = false;
        this.gameId = "";
        this.backendService.disconnect();
    };
    Peer2PeerComponent.prototype.onGameJoined = function (data) {
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
    Peer2PeerComponent.prototype.onJoinGame = function (args) {
        var _this = this;
        this.gameId = args.selectedGameId;
        this.nickname = args.nickname;
        this.backendService.checkNicknameExists(args.selectedGameId, args.nickname)
            .then(function (data) { return _this.onNicknameExistsResponse(data); });
    };
    Peer2PeerComponent.prototype.onNicknameExistsResponse = function (data) {
        var _this = this;
        var exists = data.exists;
        if (exists) {
            alert(data.msg);
            return;
        }
        this.backendService.joinGame(this.selectedGameId, this.nickname)
            .then(function (data) { return _this.onGameJoined(data); });
    };
    Peer2PeerComponent.prototype.listPlayers = function () {
        var _this = this;
        this.backendService.listPlayers(this.gameId, this.playerToken)
            .then(function (data) { return _this.onPlayersListed(data); });
    };
    Peer2PeerComponent.prototype.onPlayersListed = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.gamePlayers = data.players;
    };
    Peer2PeerComponent.prototype.onPlayerTurn = function (data) {
        if (data.nickname == this.nickname) {
            this.isMyTurn = true;
        }
    };
    Peer2PeerComponent.prototype.onGameStarted = function (data) {
        var success = data.success;
        if (!success) {
            alert(data.msg);
            return;
        }
        this.isRunning = true;
        this.guesses = [];
        this.opponentGuesses = [];
        this.step = 2;
    };
    Peer2PeerComponent.prototype.onGuessNumber = function (data) {
        if (data.nickname === this.nickname) {
            return;
        }
        this.onGuessResponse(data);
    };
    Peer2PeerComponent.prototype.onGuessResponse = function (data) {
        var bulls = data.bulls, cows = data.cows, number = data.number;
        this.guesses.push(data.nickname + ": " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
    };
    Peer2PeerComponent.prototype.onGuessPeerIncommingQuery = function (data) {
        var bullscows = { bulls: 0, cows: 0 };
        var r = this.checkGuessNumber(data.number);
        if (r.bulls == consts.NUMBER_LENGH) {
            this.backendService.fireGameOver(this.gameId, this.playerToken, this.nickname, this.secretNumber.split(""), true);
            return;
        }
        this.opponentGuesses.push("number: " + data.number.join('') + ", bulls: " + r.bulls + ", cows: " + r.cows);
        this.backendService.fireGuessPeerNumberClientResponse(this.gameId, this.playerToken, this.nickname, true, data.number, r.bulls, r.cows);
    };
    Peer2PeerComponent.prototype.checkGuessNumber = function (guessNumber) {
        var bulls = 0, cows = 0, secretNumArr = this.secretNumber.slice("");
        for (var i = 0; i < guessNumber.length; i++) {
            var num = guessNumber[i];
            var index = secretNumArr.indexOf(num.toString());
            if (index >= 0) {
                if (index == i) {
                    bulls++;
                }
                else {
                    cows++;
                }
            }
        }
        var res = {
            bulls: bulls, cows: cows
        };
        return res;
    };
    Peer2PeerComponent.prototype.onGuessPeerNumberResponse = function (data) {
        var bulls = data.bulls, cows = data.cows, number = data.number;
        this.guesses.push("number: " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
    };
    Peer2PeerComponent.prototype.onGameOverPeer = function (data) {
        var nickname = data.nickname, result = "Game over! ";
        if (nickname != this.nickname) {
            result += "You win! Number is: " + data.number.join('');
            ;
        }
        else {
            result += "You lose! Your opponent guessed your secret number!";
        }
        this.guesses.push(result);
        this.isGameOver = true;
        this.isRunning = false;
        this.gameId = "";
        this.backendService.disconnect();
    };
    Peer2PeerComponent.prototype.onGuess = function (number) {
        this.backendService.guessPeerNumber(this.gameId, this.playerToken, number).then(function (data) {
        });
        this.isMyTurn = false;
    };
    return Peer2PeerComponent;
}());
Peer2PeerComponent = __decorate([
    core_1.Component({
        selector: 'peer-2-peer',
        templateUrl: './peer-2-peer.component.html',
        providers: [peer2peer_service_1.Peer2PeerService]
    }),
    __metadata("design:paramtypes", [peer2peer_service_1.Peer2PeerService])
], Peer2PeerComponent);
exports.Peer2PeerComponent = Peer2PeerComponent;
//# sourceMappingURL=peer-2-peer.component.js.map