import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multiplayer-step1',
  templateUrl: './multiplayer-step1.component.html',
})

export class MultiplayerStep1Component implements OnInit {
	@Input() selectedGameId: string = "";
	@Input() gamesList: any[];
	@Output() createGame = new EventEmitter();
	@Output() joinGame = new EventEmitter();

	nickname: string = "";
	gameName: string = "";

	ngOnInit(): void {
	}

	onCreateGameBtnClicked() {
		this.createGame.emit({ gameName: this.gameName, nickname: this.nickname });
	}

	onJoinGameBtnClicked() {
		this.joinGame.emit({ selectedGameId: this.selectedGameId, nickname: this.nickname });
	}
}