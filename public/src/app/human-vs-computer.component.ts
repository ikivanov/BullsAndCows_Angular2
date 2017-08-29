import { Component, OnInit, OnDestroy } from '@angular/core';

import * as consts from "./consts";

import { HumanVsComputerService } from './services/human-vs-computer.service';

@Component({
  selector: 'human-vs-computer',
  templateUrl: './human-vs-computer.component.html',
  providers: [ HumanVsComputerService ]
})

export class HumanVsComputerComponent implements OnInit, OnDestroy {
	gameId: "";
	playerToken: "";

	isRunning: boolean = false;
	guesses: string[] = [];

	constructor(private backendService: HumanVsComputerService) {
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
		this.backendService.createGame(("h_vs_c" + new Date().getTime()),
										"guest",
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
	}

	onSurrenderBtnClicked(): void {
		this.backendService.surrenderGame(this.gameId, this.playerToken).then(data => {
			if (!data.success) {
				alert(data.msg);
			}
		});

		this.isRunning = false;
	}

	onGuess(number: number): void {
		this.backendService.guessNumber(this.gameId, this.playerToken, number).then(data => {
			this.onGuessResponse(data);
		});
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