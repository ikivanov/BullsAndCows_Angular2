import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multiplayer-step2',
  templateUrl: './multiplayer-step2.component.html',
})

export class MultiplayerStep2Component implements OnInit {
	@Input() gameName: string = "";
	@Input() gamePlayers: any[] = [];
	@Output() addBot = new EventEmitter();
	@Output() startGame = new EventEmitter();

	ngOnInit(): void {
	}

	onAddBotBtnClicked() {
		this.addBot.emit();
	}

	onStartGameBtnClicked() {
		this.startGame.emit();
	}
}