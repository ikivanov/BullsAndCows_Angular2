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
	    this.router.navigate(['/computerVsComputer']);
	}

	gotoMultiplayer(): void {
	    this.router.navigate(['/multiplayer']);
	}

	gotoPeer2Peer(): void {
		alert('gotoPeer2Peer');
	}
}