import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TitleComponent } from './reusables/title.component';
import { HeaderComponent } from './reusables/header.component';
import { FooterComponent } from './reusables/footer.component';
import { NumberSelectorComponent } from './reusables/number-selector.component';
import { ServerOutputComponent } from './reusables/server-output.component';

import { HomeComponent } from './home.component';
import { HumanVsComputerComponent } from './human-vs-computer.component';
import { ComputerVsComputerComponent } from './computer-vs-computer.component';
import { MultiplayerComponent } from './multiplayer.component';
import { MultiplayerStep1Component } from './multiplayer/multiplayer-step1.component';
import { MultiplayerStep2Component } from './multiplayer/multiplayer-step2.component';
import { MultiplayerStep3Component } from './multiplayer/multiplayer-step3.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [ BrowserModule, AppRoutingModule, FormsModule ],
	declarations: [
		AppComponent,
		TitleComponent,
		HeaderComponent,
		FooterComponent,
		NumberSelectorComponent,
		ServerOutputComponent,
		HomeComponent,
		HumanVsComputerComponent,
		ComputerVsComputerComponent,
		MultiplayerComponent,
		MultiplayerStep1Component,
		MultiplayerStep2Component,
		MultiplayerStep3Component
	],
  bootstrap: [ AppComponent ]
})

export class AppModule { }