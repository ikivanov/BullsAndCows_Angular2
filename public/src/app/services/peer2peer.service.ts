import { Injectable, EventEmitter } from '@angular/core';
import * as consts from '../consts';

import { MultiplayerService } from './multiplayer.service';

@Injectable()
export class Peer2PeerService extends MultiplayerService {
	public guessPeerIncommingQueryEvent: EventEmitter<any> = new EventEmitter();
	public guessPeerNumberResponseEvent: EventEmitter<any> = new EventEmitter();
	public gameOverPeerEvent: EventEmitter<any> = new EventEmitter();

	ensureConnection() {
		super.ensureConnection();

		this.socket.on(consts.GUESS_PEER_NUMBER_SERVER_EVENT, (data) => {
			this.guessPeerIncommingQueryEvent.emit(data);
		});

		this.socket.on(consts.GUESS_PEER_NUMBER_RESPONSE_EVENT, (data) => {
			this.guessPeerNumberResponseEvent.emit(data);
		});

		this.socket.on(consts.GAME_OVER_PEER_SERVER_EVENT, (data) => {
			this.gameOverPeerEvent.emit(data);
		});
	}

	fireGuessPeerNumberClientResponse(gameId, playerToken, nickname, success, number, bulls, cows) {
		this.socket.emit(consts.GUESS_PEER_NUMBER_CLIENT_RESPONSE_EVENT, {
			gameId,
			playerToken,
			nickname,
			success,
			number,
			bulls,
			cows
		});
	}

	fireGameOver(gameId, playerToken, nickname, number, success) {
		this.socket.emit(consts.GAME_OVER_PEER_CLIENT_EVENT, {
			gameId,
			playerToken,
			nickname,
			number,
			success
		});
	}

	guessPeerNumber(gameId, playerToken, number) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.GUESS_PEER_NUMBER_EVENT, {
				gameId,
				playerToken,
				number
			}, (data) => {
				if (data.success) {
					resolve(data);
				} else {
					reject(data);
				}
			});
		});
	}
}