import { Injectable, EventEmitter } from '@angular/core';
import * as consts from '../consts';

import { BackendService } from './backend.service';

@Injectable()
export class MultiplayerService extends BackendService {
	public joinGameEvent: EventEmitter<any> = new EventEmitter();
	public playerTurnEvent: EventEmitter<any> = new EventEmitter();
	public gameStartEvent: EventEmitter<any> = new EventEmitter();
	public guessNumberEvent: EventEmitter<any> = new EventEmitter();

	ensureConnection() {
		super.ensureConnection();

		this.socket.on(consts.JOIN_GAME_SERVER_EVENT, (data) => {
			this.joinGameEvent.emit(data);
		});

		this.socket.on(consts.PLAYER_TURN_SERVER_EVENT, (data) => {
			this.playerTurnEvent.emit(data);
		});

		this.socket.on(consts.GAME_STARTED_SERVER_EVENT, (data) => {
			this.gameStartEvent.emit(data);
		});

		this.socket.on(consts.GUESS_NUMBER_SERVER_EVENT, (data) => {
			this.guessNumberEvent.emit(data);
		});
	}

	createGame(gameName, nickname, type) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.CREATE_GAME_EVENT,
				{
					name: gameName,
					nickname,
					type
				},
				(data) => resolve(data)
			);
		});
	}

	startGame(gameId, playerToken) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.START_GAME_EVENT, {
				gameId, playerToken
				},
				(data) => resolve(data)
			);
		});
	}

	joinGame(gameId, nickname) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.JOIN_GAME_EVENT, { gameId, nickname },
				(data) => resolve(data)
			);
		});
	}

	listGames(gameType) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.LIST_GAMES_EVENT, { type: gameType }, data =>
				resolve(data)
			);
		});
	}

	checkNicknameExists(gameId, nickname) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.CHECK_NICKNAME_EXISTS_EVENT, { gameId, nickname },
				(data) => resolve(data)
			);
		});
	}

	listPlayers(gameId, playerToken) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.LIST_GAME_PLAYERS_EVENT,
				{
					gameId, playerToken
				},
				(data) => resolve(data)
			);
		});
	}
}