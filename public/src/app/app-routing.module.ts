import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { HumanVsComputerComponent } from './human-vs-computer.component';
import { ComputerVsComputerComponent } from './computer-vs-computer.component';
import { MultiplayerComponent } from './multiplayer.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: "full" },
	{ path: 'home', component: HomeComponent },
	{ path: 'humanVsComputer', component: HumanVsComputerComponent },
	{ path: 'computerVsComputer', component: ComputerVsComputerComponent },
	{ path: 'multiplayer', component: MultiplayerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}