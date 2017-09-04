import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'peer2peer-step1',
  templateUrl: './peer2peer-step1.component.html',
})

export class Peer2PeerStep1Component implements OnInit {
	@Input() selectedGameId: string = "";
	@Input() gamesList: any[];
	@Output() createGame = new EventEmitter();
	@Output() joinGame = new EventEmitter();

	secretNumber: string = "";
	nickname: string = "";
	gameName: string = "";

	ngOnInit(): void {
	}

	onCreateGameBtnClicked() {
		this.createGame.emit({ gameName: this.gameName, nickname: this.nickname, secretNumber: this.secretNumber });
	}

	onJoinGameBtnClicked() {
		this.joinGame.emit({ selectedGameId: this.selectedGameId, nickname: this.nickname });
	}
}