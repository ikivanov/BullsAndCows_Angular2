import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})

export class AppComponent {
	constructor(private router: Router) {
	}

	gotoHumanVsComputer(): void {
	    this.router.navigate(['/humanVsComputer']);
	}

	gotoComputerVsComputer(): void {
		alert('gotoComputerVsComputer');
	}

	gotoMultiplayer(): void {
		alert('gotoMultiplayer');
	}

	gotoPeer2Peer(): void {
		alert('gotoPeer2Peer');
	}
}