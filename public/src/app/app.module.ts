import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TitleComponent } from './reusables/title.component';
import { HeaderComponent } from './reusables/header.component';
import { FooterComponent } from './reusables/footer.component';
import { NumberSelectorComponent } from './reusables/number-selector.component';
import { ServerOutputComponent } from './reusables/server-output.component';

import { HumanVsComputerComponent } from './human-vs-computer.component';
import { ComputerVsComputerComponent } from './computer-vs-computer.component';

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
		HumanVsComputerComponent,
		ComputerVsComputerComponent
	],
  bootstrap: [ ComputerVsComputerComponent ]
})

export class AppModule { }