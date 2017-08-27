import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
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
		alert('Not Implemented!');
	}
}