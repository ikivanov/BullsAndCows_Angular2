import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
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
	    this.router.navigate(['/peer2peer']);
	}
}