import { Component, Input } from '@angular/core';

@Component({
  selector: 'server-output',
  template: `
			<select class="server-output" multiple size="12">
				<option *ngFor="let o of output">
					{{o}}
				</option>
			</select>
  		`
})

export class ServerOutputComponent {
	@Input() output: string[];
}