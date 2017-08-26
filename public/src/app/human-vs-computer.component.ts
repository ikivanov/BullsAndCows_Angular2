import { Component } from '@angular/core';

@Component({
  selector: 'human-vs-computer',
  templateUrl: './human-vs-computer.component.html',
})

export class HumanVsComputerComponent {
	onStartBtnClicked(): void {
		this.isRunning = true;
	}

	onSurrenderBtnClicked(): void {
		this.isRunning = false;
	}

	onGuess(number: number): void {
		this.guesses.push("number: 1234, bulls: 0, cows: 1");
	}

	isRunning: boolean = false;
	guesses: string[] = [];
}