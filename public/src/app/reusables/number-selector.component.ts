import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'number-selector',
  templateUrl: './number-selector.component.html',
})

export class NumberSelectorComponent {
	number1: number = 1;
	number2: number = 2;
	number3: number = 3;
	number4: number = 4;

	@Input() disabled: boolean = false;

	isValidInput: boolean = true;

	@Output() guess = new EventEmitter();

	onGuessBtnClicked(): void {
		let number = [ this.number1, this.number2, this.number3, this.number4 ];

		this.guess.emit(number);
	}

	onNumberChanged() {
		this.isValidInput = this.isValidNumber();
	}

    isValidNumber() {
		if (this.number1 === 0) {
			return false;
		}

		let nums = [ this.number1, this.number2, this.number3, this.number4 ];

		//are numbers different from each other?
		for (let i = 0; i < nums.length; i++) {
			for (let j = nums.length - 1; j > i; j--) {
				if (nums[i] == nums[j])
					return false;
			}
		}

		return true;
	}
}