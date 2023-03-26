import { Component, OnInit, Injectable, Input, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class BotComponent {
  @ViewChild('content') modalContent!: any;
  @Input() choosen: string = '';
  grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  lastchoose = '';
  toggleUser = false;
  counter = 0; //variable for tier  counting how much grid was clicked
  drawer = 0;
  drawCounter = 0;
  winGame = false;

  // HTML variables ====================
  toggleTurn = true; // topside which turn is now 9
  iqsik = 0; //player score 41
  tier = 0; //tier score 45
  nolik = 0; //second player score 49
  modalToggle = 'none'; //display modal 55
  whoIs = 'test'; //who win in modal
  imgToggler = 1; //who win toggle icon in modal
  colorModal = 'blue'; //h1 color in modal
  midol = 'test'; //h1 in modal
  // ======================================

  ngOnInit() {
    this.lastchoose = this.choosen; // assign choosen to player property'
    if (this.lastchoose == 'O') {
      const randomInteger = Math.floor(Math.random() * 9);
      this.grids[randomInteger] = 1;
      this.drawCounter++;
      this.toggleTurn = false;
    }
  }

  gridsFuncs(index: number) {
    //when click the grid
    if (!this.grids[index] && !this.toggleUser) {
      //if grid is empty'
      this.counter++;

      if (this.lastchoose == 'X') {
        // if user choose X

        this.toggleTurn = !this.toggleTurn;
        this.grids[index] = 1;
        this.toggleUser = true;
        this.win();
        if (this.modalToggle == 'none') {
          setTimeout(() => {
            this.grids[this.randomNumber()] = 2;
            this.toggleUser = false;
            this.toggleTurn = !this.toggleTurn;

            this.win();
          }, 500);
        }
        this.draw();
      } else {
        this.toggleTurn = true;
        // if user choose O
        this.grids[index] = 2;
        this.drawCounter++;
        this.toggleUser = true;
        this.win();
        if (this.modalToggle == 'none') {
          setTimeout(() => {
            this.toggleTurn = !this.toggleTurn;
            this.grids[this.randomNumber()] = 1;
            this.drawCounter++;
            this.toggleUser = false;
            this.win();
            this.draw();
          }, 500);
        }
      }
    }
  }

  closeModal() {
    window.location.reload();
  }

  nextRound() {
    this.grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.toggleUser = false;
    this.toggleTurn = true; // topside which turn is now 9
    this.modalToggle = 'none'; //display modal 55
    this.whoIs = 'test'; //who win in modal
    this.imgToggler = 0; //who win toggle icon in modal
    this.colorModal = 'blue'; //h1 color in modal
    this.midol = 'test'; //h1 in modal
    this.counter = 0;
    this.drawCounter = 0;
    this.drawer = 0;
    this.winGame = false;
    //===========================

    if (this.lastchoose == 'O') {
      const randomInteger = Math.floor(Math.random() * 9);
      this.grids[randomInteger] = 1;
      this.drawCounter++;
      this.toggleTurn = false;
    }
  }
  draw() {
    if (
      this.randomNumber() == undefined &&
      this.lastchoose == 'X' &&
      !this.winGame
    ) {
      this.modalToggle = 'block';
      this.midol = 'ROUND TIED';
      this.colorModal = '#A8BFC9';
      this.tier++;
      this.whoIs = '';

    } else if (
      this.drawCounter == 9 &&
      this.lastchoose == 'O' &&
      !this.winGame
    ) {
      this.modalToggle = 'block';
      this.midol = 'ROUND TIED';
      this.colorModal = '#A8BFC9';
      this.tier++;
      this.whoIs = '';

    }
  }

  randomNumber() {
    let listCounter: number[] = [];
    let randomInteger = 0;
    this.grids.forEach((number, index) => {
      if (!number) {
        listCounter.push(index);
      }
    });

    randomInteger = Math.floor(Math.random() * listCounter.length);

    this.drawer = listCounter.length;
    return listCounter[randomInteger];
  }

  win() {
    this.winner(this.grids[0], this.grids[1], this.grids[2]);
    this.winner(this.grids[0], this.grids[3], this.grids[6]);
    this.winner(this.grids[0], this.grids[4], this.grids[8]);
    this.winner(this.grids[1], this.grids[4], this.grids[7]);
    this.winner(this.grids[2], this.grids[5], this.grids[8]);
    this.winner(this.grids[2], this.grids[4], this.grids[6]);
    this.winner(this.grids[3], this.grids[4], this.grids[5]);
    this.winner(this.grids[6], this.grids[7], this.grids[8]);
  }

  winner(a: number, b: number, c: number) {
    if (a && b && c) {
      if (a == b && b == c) {
        this.modalToggle = 'block';
        if (a == 1) {
          this.whoIs = 'PLAYER 1 WINS!';
          this.imgToggler = 1;
          this.colorModal = '#31c3bd';
          this.midol = 'TAKES THE ROUND';
          this.iqsik++;
          this.winGame = true;
        } else if (b == 2) {
          this.whoIs = 'PLAYER 2 WINS!';
          this.imgToggler = 2;
          this.colorModal = '#f2b137';
          this.midol = 'TAKES THE ROUND';
          this.nolik++;
          this.winGame = true;
        }
      }
    }
  }
}
