import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HumanVsComputerComponent } from './human-vs-computer.component';
import { ComputerVsComputerComponent } from './computer-vs-computer.component';
import { MultiplayerComponent } from './multiplayer.component';

const routes: Routes = [
	{ path: 'src',  component: MultiplayerComponent },
	{ path: 'src/humanVsComputer', component: HumanVsComputerComponent },
	{ path: 'src/computerVsComputer', component: ComputerVsComputerComponent },
	{ path: 'src/multiplayer', component: MultiplayerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}