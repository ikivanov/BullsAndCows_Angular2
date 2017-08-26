import { Component, OnInit } from '@angular/core';

import * as io from "socket.io-client";

import * as consts from "./consts";
import BotPlayer from './botPlayer.js';

@Component({
  selector: 'computer-vs-computer',
  templateUrl: './computer-vs-computer.component.html',
})

export class ComputerVsComputerComponent implements OnInit {
	socket: null;
	gameId: "";
	playerToken: "";

	isRunning: boolean = false;
	guesses: string[] = [];

	constructor() {
		this.nickname = "h_vs_c_" + new Date().getTime();
		this.gameName = "computerVsComputer_" + new Date().getTime();
		this.gameType = consts.SINGLE_PLAYER;

		this.gameId = "";
		this.playerToken = "";

		this.botPlayer = null;
	}

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
		this.botPlayer = null;

		if (!this.socket) {
			this.initSocket();
		}

		this.socket.emit(consts.CREATE_GAME_EVENT,
			{
				name: this.gameName,
				nickname: this.nickname,
				type: this.gameType
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

		this.botPlayer = new BotPlayer(this, this.socket, this.gameId, this.nickname, this.playerToken);
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