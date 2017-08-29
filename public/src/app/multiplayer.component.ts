import { Component, OnInit, OnDestroy } from '@angular/core';

import BotPlayer from "./botPlayer";
import * as consts from "./consts";

import { MultiplayerService } from './services/multiplayer.service';

@Component({
  selector: 'multiplayer',
  templateUrl: './multiplayer.component.html',
  providers: [ MultiplayerService ]
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

	constructor(private backendService: MultiplayerService) {
	}

	ngOnInit(): void {
		this.backendService.gameOver.subscribe(data => {
			this.onGameOver(data);
		});

		this.backendService.joinGameEvent.subscribe(data => {
			this.onGameJoined(data);
		});

		this.backendService.playerTurnEvent.subscribe(data => {
			this.onPlayerTurn(data);
		});

		this.backendService.gameStartEvent.subscribe(data => {
			this.onGameStarted(data);
		});

		this.backendService.guessNumberEvent.subscribe(data => {
			this.onGuessNumber(data);
		});

		this.backendService.ensureConnection();
		this.backendService.listGames(this.gameType).then(data => this.onGamesListed(data));
	}

	ngOnDestroy(): void {
		this.backendService.gameOver.unsubscribe();
		this.backendService.joinGameEvent.unsubscribe();
		this.backendService.playerTurnEvent.unsubscribe();
		this.backendService.gameStartEvent.unsubscribe();
		this.backendService.guessNumberEvent.unsubscribe();
		this.backendService.disconnect();
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
		this.gameName = args.gameName;

		this.backendService.createGame(this.gameName, this.nickname, this.gameType)
			.then(data => this.onGameCreated(data));
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
		this.gameId = args.selectedGameId;
		this.nickname = args.nickname;

		this.backendService.checkNicknameExists(args.selectedGameId, args.nickname)
			.then(data => this.onNicknameExistsResponse(data));
	}

	onNicknameExistsResponse(data) {
		let exists = data.exists;

		if (exists) {
			alert(data.msg);
			return;
		}

		this.backendService.joinGame(this.selectedGameId, this.nickname)
			.then(data => this.onGameJoined(data));
	}

	onGameJoined(data) {
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
		this.backendService.listPlayers(this.gameId, this.playerToken)
			.then(data => this.onPlayersListed(data));
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
		let nickname = "botPlayer_" + new Date().getTime(),
			bot = new BotPlayer(null, this.backendService, this.gameId, nickname);

		bot.joinGame(this.gameId);
	}

	onStartGame() {
		this.backendService.startGame(this.gameId, this.playerToken)
			.then(data => this.onGameStarted(data));
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

		this.backendService.disconnect();
	}

	onGuessNumber(data) {
		if (data.nickname === this.nickname) {
			return;
		}

		this.onGuessResponse(data);
	}

	onGuess(number) {
		this.backendService.guessNumber(this.gameId, this.playerToken, number).then(data => {
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
}