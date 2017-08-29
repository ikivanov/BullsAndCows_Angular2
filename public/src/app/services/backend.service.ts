import { Injectable, EventEmitter } from '@angular/core';
import * as io from "socket.io-client";
import * as consts from '../consts';

export class BackendService {
	protected socket;
	public gameOver: EventEmitter<any> = new EventEmitter();

	ensureConnection() {
		if (this.socket) {
			return;
		}

		this.socket = io.connect(consts.SERVER_ADDRESS, { 'forceNew': true });

		this.socket.on(consts.GAME_OVER_EVENT, (data) => {
			this.gameOver.emit(data);
		});
	}

	disconnect() {
		if (!this.socket) return;

		this.socket.removeAllListeners();
		this.socket.disconnect();
		this.socket = null;
	}

	createGame(gameName, nickname, gameType): Promise<any> {
		return new Promise((resolve, reject) => {
			this.ensureConnection();

			this.socket.emit(consts.CREATE_GAME_EVENT,
				{
					name: gameName,
					nickname: nickname,
					type: gameType
				},
				(data) => {
					resolve(data);
				});
		});
	}

	startGame(gameId, playerToken): Promise<any> {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.START_GAME_EVENT,
				{
					gameId,
					playerToken
				},
				(data) => {
					resolve(data);
			});
		});
	}

	guessNumber(gameId, playerToken, number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.GUESS_NUMBER_EVENT,
				{
					gameId,
					playerToken,
					number
				},
				(data) => {
					resolve(data);
				}
			);
		});
	}
}