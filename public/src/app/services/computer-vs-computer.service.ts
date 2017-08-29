import { Injectable, EventEmitter } from '@angular/core';
import * as consts from '../consts';

import { BackendService } from './backend.service';

@Injectable()
export class ComputerVsComputerService extends BackendService {
	public playerTurn: EventEmitter<any> = new EventEmitter();

	ensureConnection() {
		super.ensureConnection();

		this.socket.on(consts.PLAYER_TURN_SERVER_EVENT, (data) => {
			this.playerTurn.emit(data);
		});
	}

	joinGame(gameId, nickname) {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.JOIN_GAME_EVENT,
				{
					gameId,
					nickname
				},
				(data) => {
					resolve(data);
			});
		});
	}
}