"use strict";
var consts = require("./consts");
var BotPlayer = (function () {
    function BotPlayer(viewModel, backendService, gameId, nickname, playerToken) {
        var _this = this;
        this.viewModel = viewModel;
        this.backendService = backendService;
        this.gameId = gameId;
        this.playerToken = playerToken;
        this.nickname = nickname ? nickname : "botPlayer_" + new Date().getTime();
        this.playerTurnSubscription = this.backendService.playerTurn.subscribe(function (data) { return _this.onPlayerTurn(data); });
        this.answers = this.getPermutations(consts.NUMBER_LENGH, "123456789");
        this.answers = this.shuffle(this.answers);
    }
    BotPlayer.prototype.dispose = function () {
        this.playerTurnSubscription.unsubscribe();
    };
    BotPlayer.prototype.joinGame = function (gameId) {
        var _this = this;
        this.backendService.joinGame(gameId, this.nickname).then(function (data) { return _this.onGameJoined(data); });
    };
    BotPlayer.prototype.onGameJoined = function (data) {
        var success = data.success;
        if (!success) {
            return;
        }
        if (this.nickname == data.nickname) {
            this.gameId = data.gameId;
            this.playerToken = data.playerToken;
        }
    };
    BotPlayer.prototype.onPlayerTurn = function (data) {
        if (data.nickname === this.nickname) {
            this.guess();
        }
    };
    BotPlayer.prototype.guess = function () {
        var _this = this;
        var guessNum = this.answers[0];
        var arr = guessNum.split('');
        this.backendService.guessNumber(this.gameId, this.playerToken, [arr[0], arr[1], arr[2], arr[3]])
            .then(function (data) { return _this.onGuessResponse(data); });
    };
    BotPlayer.prototype.onGuessResponse = function (data) {
        var gameId = data.gameId, bulls = data.bulls, cows = data.cows, number = data.number;
        this.reduceAnswers(number.join(''), bulls, cows);
        if (this.viewModel) {
            this.viewModel.onGuessResponse(data);
        }
    };
    BotPlayer.prototype.reduceAnswers = function (guess, bulls, cows) {
        var that = this;
        for (var i = that.answers.length - 1; i >= 0; i--) {
            var tb = 0, tc = 0;
            for (var ix = 0; ix < consts.NUMBER_LENGH; ix++)
                if (that.answers[i][ix] == guess[ix])
                    tb++;
                else if (that.answers[i].indexOf(guess[ix]) >= 0)
                    tc++;
            if ((tb != bulls) || (tc != cows))
                that.answers.splice(i, 1);
        }
    };
    BotPlayer.prototype.getPermutations = function (n, word) {
        var that = this;
        var tmpPermutation = [];
        if (!word || word.length == 0 || n <= 0) {
            tmpPermutation.push("");
        }
        else {
            for (var i = 0; i < word.length; i++) {
                var tmpWord = word.substr(0, i) + word.substr(i + 1);
                var perms = that.getPermutations(n - 1, tmpWord);
                for (var j = 0; j < perms.length; j++) {
                    var item = perms[j];
                    tmpPermutation.push(word[i] + item);
                }
            }
        }
        return tmpPermutation;
    };
    //Fisher–Yates Shuffle
    BotPlayer.prototype.shuffle = function (array) {
        var m = array.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    };
    return BotPlayer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotPlayer;
//# sourceMappingURL=botPlayer.js.map