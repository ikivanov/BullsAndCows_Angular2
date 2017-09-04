import { Component, OnInit, OnDestroy } from '@angular/core';

import * as consts from "./consts";

import { Peer2PeerService } from './services/peer2peer.service';

@Component({
  selector: 'peer-2-peer',
  templateUrl: './peer-2-peer.component.html',
  providers: [ Peer2PeerService ]
})

export class Peer2PeerComponent implements OnInit {
	step: number = 0;
	isGameOver: boolean = false;
	isRunning: boolean = false;
	nickname: string = "";
	gameName: string = "";
	guesses: string[] = [];
	opponentGuesses: string[] = [];
	isMyTurn: boolean = false;
	gamesList: any[] = [];
	secretNumber: string = "";
	gamePlayers: any[] = [];
	selectedGameId: string = "";
	gameType: number = consts.PEER_2_PEER;
	gameId: string = "";
	playerToken: string = "";
	isGameCreator: boolean = false;

	constructor(private backendService: Peer2PeerService) {
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

		this.backendService.guessPeerIncommingQueryEvent.subscribe(data => {
			this.onGuessPeerIncommingQuery(data);
		});

		this.backendService.guessPeerNumberResponseEvent.subscribe(data => {
			this.onGuessPeerNumberResponse(data);
		});

		this.backendService.gameOverPeerEvent.subscribe(data => {
			this.onGameOverPeer(data);
		})

		this.backendService.ensureConnection();
		this.backendService.listGames(this.gameType).then(data => this.onGamesListed(data));
	}

	ngOnDestroy(): void {
		this.backendService.gameOver.unsubscribe();
		this.backendService.joinGameEvent.unsubscribe();
		this.backendService.playerTurnEvent.unsubscribe();
		this.backendService.gameStartEvent.unsubscribe();
		this.backendService.guessNumberEvent.unsubscribe();
		this.backendService.guessPeerIncommingQueryEvent.unsubscribe();
		this.backendService.guessPeerNumberResponseEvent.unsubscribe();
		this.backendService.gameOverPeerEvent.unsubscribe();
		this.backendService.disconnect();
	}

	onCreateGame(args) {
		this.nickname = args.nickname,
		this.gameName = args.gameName;
		this.secretNumber = args.secretNumber;

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

		this.step = 1;
	}

	onStartGame() {
		this.backendService.startGame(this.gameId, this.playerToken)
			.then(data => this.onGameStarted(data));
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

	onGameOver(data) {
		let nickname = data.nickname,
			result = "Game over! ";

		if (nickname != this.nickname) {
			result += "You win! Number is: " + data.number.join('');;
		} else {
			result += "You lose! Your opponent guessed your secret number!";
		}

		this.guesses.push(result);

		this.isGameOver = true;
		this.isRunning = false;
		this.gameId = "";

		this.backendService.disconnect();
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

	onPlayerTurn(data) {
		if (data.nickname == this.nickname) {
			this.isMyTurn = true;
		}
	}

	onGameStarted(data) {
		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.isRunning = true;
		this.guesses = [];
		this.opponentGuesses = [];
		this.step = 2
	}

	onGuessNumber(data) {
		if (data.nickname === this.nickname) {
			return;
		}

		this.onGuessResponse(data);
	}

	onGuessResponse(data) {
		let bulls = data.bulls,
			cows = data.cows,
			number = data.number;

		this.guesses.push(data.nickname + ": " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
	}

	onGuessPeerIncommingQuery(data) {
		let bullscows = { bulls: 0, cows: 0 };

		let r = this.checkGuessNumber(data.number);
		if (r.bulls == consts.NUMBER_LENGH) {
			this.backendService.fireGameOver(this.gameId, this.playerToken, this.nickname, this.secretNumber.split(""), true);
			return;
		}

		this.opponentGuesses.push("number: " + data.number.join('') + ", bulls: " + r.bulls + ", cows: " + r.cows);

		this.backendService.fireGuessPeerNumberClientResponse(this.gameId, this.playerToken, this.nickname, true, data.number, r.bulls, r.cows);
	}

	checkGuessNumber(guessNumber) {
		let bulls = 0, cows = 0,
			secretNumArr = this.secretNumber.slice("");

		for (let i = 0; i < guessNumber.length; i++) {
			let num = guessNumber[i];

			let index = secretNumArr.indexOf(num.toString());
			if (index >= 0) {
				if (index == i) {
					bulls++;
				} else {
					cows++;
				}
			}
		}

		let res =
			{
				bulls: bulls, cows: cows
			}

		return res;
	}

	onGuessPeerNumberResponse(data) {
		let bulls = data.bulls, cows = data.cows,
			number = data.number;

		this.guesses.push("number: " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
	}

	onGameOverPeer(data) {
		let nickname = data.nickname,
			result = "Game over! ";

		if (nickname != this.nickname) {
			result += "You win! Number is: " + data.number.join('');;
		} else {
			result += "You lose! Your opponent guessed your secret number!";
		}

		this.guesses.push(result);
		this.isGameOver = true;
		this.isRunning = false;
		this.gameId = "";

		this.backendService.disconnect();
	}

	onGuess(number) {
		this.backendService.guessPeerNumber(this.gameId, this.playerToken, number).then(data => {
		});

		this.isMyTurn = false;
	}
}