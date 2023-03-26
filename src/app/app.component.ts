import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tic-tac-toe';
  game = false;
  menu = true;
  bot = false;
  public choosen:string = '';
  

  onButtonClicked(choosen:string) {
    this.menu = false;
    this.game = true;
    this.choosen = choosen;
  }
  bottGamer(choosen:string) {
    this.menu = false;
    this.game = false;
    this.bot = true;
    this.choosen = choosen;
  }
}
