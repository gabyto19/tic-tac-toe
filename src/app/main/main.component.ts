import {
  Component,
  EventEmitter,
  Output,
  Injectable,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  choosen = 'X';
  bgToggler = false;
  @Output() startGame = new EventEmitter();
  @Output() botGamer = new EventEmitter();



  bgTogglerX() {
    this.bgToggler = false;
    this.choosen = 'X';
  }
  bgTogglerO() {
    this.bgToggler = true;
    this.choosen = 'O';
  }
  playGame() {
    this.startGame.emit(this.choosen);
  }
  botGame(){
    this.botGamer.emit(this.choosen);
  }
}
