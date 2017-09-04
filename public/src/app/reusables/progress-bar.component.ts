import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `
			<div class="game-progress">
				<img src="img/waiting.gif" />
				<span>{{ text }}</span>
			</div>
	`
})

export class ProgressBarComponent {
	@Input() text: string;
}