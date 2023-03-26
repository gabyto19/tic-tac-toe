import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PlayComponent } from './play/play.component';
import { BotComponent } from './bot/bot.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayComponent,
    BotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
