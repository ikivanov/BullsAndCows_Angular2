import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HumanVsComputerComponent } from './human-vs-computer.component';

const routes: Routes = [
	{ path: 'src',  component: HumanVsComputerComponent },
	{ path: 'src/humanVsComputer', component: HumanVsComputerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}