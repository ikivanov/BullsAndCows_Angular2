import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'peer2peer-step2',
  templateUrl: './peer2peer-step2.component.html',
})

export class Peer2PeerStep2Component implements OnInit {
	@Input() gameName: string = "";
	@Input() gamePlayers: any[] = [];
	@Output() startGame = new EventEmitter();

	ngOnInit(): void {
	}

	onStartGameBtnClicked() {
		this.startGame.emit();
	}
}