import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multiplayer-step3',
  templateUrl: './multiplayer-step3.component.html',
})

export class MultiplayerStep3Component implements OnInit {
	@Input() isGameOver: boolean = false;
	@Input() isRunning: boolean = false;
	@Input() isMyTurn: boolean = false;
	@Input() guesses: any[] = [];
	@Output() guess = new EventEmitter();

	ngOnInit(): void {
	}

	onGuess(number) {
		this.guess.emit(number);
	}
}