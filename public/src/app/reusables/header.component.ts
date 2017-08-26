import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  template: `
			<div class="info-title">
				<div>{{ title }}</div>
				<div>{{ description }}</div>
			</div>
	`,
})

export class HeaderComponent {
	@Input() title: string;
	@Input() description: string;
}
