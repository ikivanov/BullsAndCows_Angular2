import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'peer2peer-step3',
  templateUrl: './peer2peer-step3.component.html',
})

export class Peer2PeerStep3Component implements OnInit {
	@Input() isGameOver: boolean = false;
	@Input() isRunning: boolean = false;
	@Input() isMyTurn: boolean = false;
	@Input() guesses: any[] = [];
	@Input() opponentGuesses: any[] = [];
	@Output() guess = new EventEmitter();

	ngOnInit(): void {
	}

	onGuess(number) {
		this.guess.emit(number);
	}
}