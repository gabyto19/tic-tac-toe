import { Component, OnInit, Injectable, Input, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PlayComponent {
  @ViewChild('content') modalContent!: any;
  @Input() choosen: string = '';
  grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  lastchoose = '';
  counter = 1;
  iqsik = 0;
  nolik = 0;
  tier = 0;
  toggler = false;
  modalToggle = 'none';
  whoIs = '';
  one = 1;
  imgToggler = 0;
  toggleTurn = true;
  colorModal = '';
  midol = '';
  listCounter: number[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.lastchoose = this.choosen; // assign choosen to player property'
    if (this.lastchoose == 'O') {
      const randomInteger = Math.floor(Math.random() * 9);
      console.log('random:' + randomInteger);
      this.grids[randomInteger] = 1;
      this.counter++;
    }
  }

  gridsFuncs(index: number) {
    let count = 0;
    this.listCounter = [];
    if (!this.grids[index]) {
      if (this.counter % 2 == 1) {
        this.grids[index] = 1;
        this.toggleTurn = false;
        this.counter++;
      } else {
        this.grids[index] = 2;
        this.counter++;
        this.toggleTurn = true;
      }
      this.grids.forEach((number, index) => {
        
        if (this.toggler == false) {
          count = 1;
          this.toggler = true;
        }
        if (!number) {
          count++;
        }
      });
      if (count == 0) {
        this.modalToggle = 'block';
        this.midol = 'ROUND TIED';
        this.colorModal = '#A8BFC9';
        this.tier++;
      }

      this.winner(this.grids[0], this.grids[1], this.grids[2]);
      this.winner(this.grids[0], this.grids[3], this.grids[6]);
      this.winner(this.grids[0], this.grids[4], this.grids[8]);
      this.winner(this.grids[1], this.grids[4], this.grids[7]);
      this.winner(this.grids[2], this.grids[5], this.grids[8]);
      this.winner(this.grids[2], this.grids[4], this.grids[6]);
      this.winner(this.grids[3], this.grids[4], this.grids[5]);
      this.winner(this.grids[4], this.grids[5], this.grids[6]);
      this.winner(this.grids[6], this.grids[7], this.grids[8]);
    }
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
        } else if (b == 2) {
          this.whoIs = 'PLAYER 2 WINS!';
          this.imgToggler = 2;
          this.colorModal = '#f2b137';
          this.midol = 'TAKES THE ROUND';
          this.nolik++;
        }
      }
    }
  }


  closeModal() {
    window.location.reload();
  }

  nextRound() {
    this.modalToggle = 'none';
    this.grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.counter = 1;
    this.toggler = false;
    this.modalToggle = 'none';
    this.whoIs = '';
    this.one = 1;
    this.imgToggler = 0;
    this.toggleTurn = true;
    this.colorModal = '';
    this.listCounter = [];
    this.lastchoose = '';
  }
}
