import { Component, OnInit } from '@angular/core';

import * as io from "socket.io-client";

import BotPlayer from "./botPlayer";
import * as consts from "./consts";

@Component({
  selector: 'multiplayer',
  templateUrl: './multiplayer.component.html',
})

export class MultiplayerComponent implements OnInit {
	step: number = 0;
	isGameOver: boolean = false;
	isRunning: boolean = false;
	nickname: string = "";
	guesses: string[] = [];
	gameName: string = "";
	selectedGameId: string = "";
	isMyTurn: boolean = false;
	gamesList: any[] = [];
	gamePlayers: any[] = [];
	socket: null;
	gameType: number = consts.MULTIPLAYER;
	gameId: string = "";
	playerToken: string = "";
	isGameCreator: boolean = false;
	bots: any[] = [];

	ngOnInit(): void {
		this.initSocket();

		this.listGames();
	}

	initSocket () {
		this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });

		this.socket.on(consts.GAME_OVER_EVENT, (data) => {
			this.onGameOver(data);
		});

		this.socket.on(consts.JOIN_GAME_SERVER_EVENT, (data) => {
			this.onGameJoined(data);
		});

		this.socket.on(consts.PLAYER_TURN_SERVER_EVENT, (data) => {
			this.onPlayerTurn(data);
		});

		this.socket.on(consts.GAME_STARTED_SERVER_EVENT, (data) => {
			this.onGameStarted(data);
		});

		this.socket.on(consts.GUESS_NUMBER_SERVER_EVENT, (data) => {
			this.onGuessNumber(data);
		});
	}

	listGames() {
		this.socket.emit(consts.LIST_GAMES_EVENT, { type: this.gameType },
			(data) => this.onGamesListed(data)
		);
	}

	onGamesListed(data) {
		let  success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.gamesList = data.gamesList;

		if (data.gamesList && data.gamesList.length > 0) {
			this.selectedGameId = data.gamesList[0].id;
		}
	}

	onCreateGame(args) {
		this.nickname = args.nickname,
		this.gameName = args.gameName

		if (!this.socket) {
			this.initSocket();
		}

		this.socket.emit(consts.CREATE_GAME_EVENT,
			{
				name: args.gameName,
				nickname: args.nickname,
				type: this.gameType
			},
			(data) => this.onGameCreated(data)
		);
	}

	onGameCreated(data) {
		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.gameId = data.gameId;
		this.playerToken = data.playerToken;

		this.isGameCreator = true;

		this.listPlayers();

		this.step  = 1;
	}

	onJoinGame(args) {
		if (!this.socket) {
			this.initSocket();
		}

		this.gameId = args.selectedGameId;
		this.nickname = args.nickname;

		this.socket.emit(consts.CHECK_NICKNAME_EXISTS_EVENT, {
			gameId: args.selectedGameId,
			nickname: args.nickname },
			(data) => this.onNicknameExistsResponse(data)
		);
	}

	onNicknameExistsResponse(data) {
		let exists = data.exists;

		if (exists) {
			alert(data.msg);
			return;
		}

		this.socket.emit(consts.JOIN_GAME_EVENT, {
			gameId: this.selectedGameId,
			nickname: this.nickname },
			(data) => this.onGameJoined(data)
		);
	}

	onGameJoined(data) {
		alert("onGameJoined");

		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		if (this.nickname == data.nickname) { //current user has joined the game, go to step 2
			this.gameId = data.gameId;
			this.playerToken = data.playerToken;

			this.step = 2;
		} else { //another user has joined the game, update the player list
			if (this.isGameCreator) {
				this.listPlayers();
			}
		}
	}

	listPlayers() {
		this.socket.emit(consts.LIST_GAME_PLAYERS_EVENT,
			{
				gameId: this.gameId,
				playerToken: this.playerToken
			},
			(data) => this.onPlayersListed(data)
		);
	}

	onPlayersListed(data) {
		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.gamePlayers = data.players;
	}

	onAddBot() {
		let botSocket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true }),
			nickname = "botPlayer_" + new Date().getTime(),
			bot = new BotPlayer(null, botSocket, this.gameId, nickname);

		bot.joinGame(this.gameId);
	}

	onStartGame() {
		this.socket.emit(consts.START_GAME_EVENT, {
			gameId: this.gameId,
			playerToken: this.playerToken
			},
			(data) => this.onGameStarted(data)
		);
	}

	onGameStarted(data) {
		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.isRunning = true;
		this.guesses = [];
		this.step = 2
	}

	onPlayerTurn(data) {
		if (data.nickname == this.nickname) {
			this.isMyTurn = true;
		}
	}

	onGameOver(data) {
		let winStr = data.win ? "win" : "lose",
			result = "Game over! You " + winStr + "! Number is: " + data.number.join('');

		this.guesses.push(result);

		this.isGameOver = true;
		this.isRunning = false;

		this.gameId = "";

		this.closeSocket();
	}

	onGuessNumber(data) {
		if (data.nickname === this.nickname) {
			return;
		}

		this.onGuessResponse(data);
	}

	onGuess(number) {
		this.socket.emit(consts.GUESS_NUMBER_EVENT, {
			gameId: this.gameId,
			playerToken: this.playerToken,
			number
		}, (data) => {
			this.onGuessResponse(data);
			this.isMyTurn = false;
		});
	}

	onGuessResponse(data) {
		let bulls = data.bulls,
			cows = data.cows,
			number = data.number;

		this.guesses.push(data.nickname + ": " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
	}

	closeSocket() {
		this.socket.removeAllListeners();
		this.socket.disconnect();
		this.socket = null;
	}
}