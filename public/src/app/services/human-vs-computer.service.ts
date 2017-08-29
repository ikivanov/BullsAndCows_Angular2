import { Injectable, EventEmitter } from '@angular/core';
import * as consts from '../consts';

import { BackendService } from './backend.service';

@Injectable()
export class HumanVsComputerService extends BackendService {
	surrenderGame(gameId, playerToken): Promise<any> {
		return new Promise((resolve, reject) => {
			this.socket.emit(consts.SURRENDER_GAME_EVENT,
				{
					gameId,
					playerToken
				},
				(data) => {
					resolve(data);
				}
			);
		});
	}
}