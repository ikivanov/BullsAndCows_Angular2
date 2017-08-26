import { Component, OnInit } from '@angular/core';

import * as io from "socket.io-client";

import * as consts from "./consts";

@Component({
  selector: 'human-vs-computer',
  templateUrl: './human-vs-computer.component.html',
})

export class HumanVsComputerComponent implements OnInit {
	socket: null;
	gameId: "";
	playerToken: "";

	isRunning: boolean = false;
	guesses: string[] = [];

	ngOnInit(): void {
		this.initSocket();
	}

	initSocket () {
		this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });

		this.socket.on(consts.GAME_OVER_EVENT, (data) => {
			this.onGameOver(data);
		});
	}

	closeSocket() {
		this.socket.removeAllListeners();
		this.socket.disconnect();
		this.socket = null;
	}

	onStartBtnClicked(): void {
		if (!this.socket) {
			this.initSocket();
		}

		this.socket.emit(consts.CREATE_GAME_EVENT,
			{
				name: ("h_vs_c" + new Date().getTime()),
				nickname: "guest",
				type: consts.SINGLE_PLAYER
			},
			(data) => { this.onGameCreated(data); });
	}

	onGameCreated(data) {
		let success = data.success;

		if (!success) {
			alert(data.msg);
			return;
		}

		this.gameId = data.gameId;
		this.playerToken = data.playerToken;

		this.socket.emit(consts.START_GAME_EVENT,
			{
				gameId: this.gameId,
				playerToken: this.playerToken
			},
			(data) => {
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
		this.socket.emit(consts.SURRENDER_GAME_EVENT,
			{
				gameId: this.gameId,
				playerToken: this.playerToken
			},
			(data) => {
				if (!data.success) {
					alert(data.msg);
				}
			}
		);

		this.isRunning = false;
	}

	onGuess(number: number): void {
		this.socket.emit(consts.GUESS_NUMBER_EVENT,
			{
				gameId: this.gameId,
				playerToken: this.playerToken,
				number
			},
			(data) => {
				this.onGuessResponse(data);
			}
		);
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

		this.closeSocket();
	}
}