import { Component, OnInit, OnDestroy } from '@angular/core';

import * as consts from "./consts";
import BotPlayer from './botPlayer.js';

import { ComputerVsComputerService } from './services/computer-vs-computer.service';

@Component({
  selector: 'computer-vs-computer',
  templateUrl: './computer-vs-computer.component.html',
  providers: [ ComputerVsComputerService ]
})

export class ComputerVsComputerComponent implements OnInit, OnDestroy {
	gameId: "";
	playerToken: "";

	isRunning: boolean = false;
	guesses: string[] = [];

	constructor(private backendService: ComputerVsComputerService) {
		this.nickname = "h_vs_c_" + new Date().getTime();
		this.gameName = "computerVsComputer_" + new Date().getTime();
		this.gameType = consts.SINGLE_PLAYER;

		this.gameId = "";
		this.playerToken = "";

		this.botPlayer = null;
	}

	ngOnInit(): void {
		this.backendService.gameOver.subscribe(data => {
			this.onGameOver(data);
		});
	}

	ngOnDestroy(): void {
		this.backendService.gameOver.unsubscribe();
		this.backendService.disconnect();
	}

	onStartBtnClicked(): void {
		if (this.botPlayer) {
			this.botPlayer.dispose();
			this.botPlayer = null;
		}

		this.backendService.createGame(this.gameName,
										this.nickname,
										consts.SINGLE_PLAYER).then(data => {
			this.onGameCreated(data);
		});
	}

	onGameCreated(data) {
		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.gameId = data.gameId;
		this.playerToken = data.playerToken;

		this.backendService.startGame(this.gameId, this.playerToken).then(data => {
			let success = data.success;
			if (!success) {
				alert(data.msg);
				return;
			}

			this.isRunning = true;
			this.guesses = [];
		});

		this.botPlayer = new BotPlayer(this, this.backendService, this.gameId, this.nickname, this.playerToken);
	}

	onGuessResponse(data) {
		let bulls = data.bulls,
			cows = data.cows,
			number = data.number;

		this.guesses.push("number: " + number.join('') + ", bulls: " + bulls + ", cows: " + cows);
	}

	onGameOver(data) {
		let winStr = data.win ? "win" : "lose",
			result = "Game over! You " + winStr + "! Number is: " + data.number.join('');

		this.guesses.push(result);
		this.isRunning = false;

		this.gameId = "";

		this.backendService.disconnect();
	}
}