import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'colorsGame';

  redDiv: HTMLElement | null = null;
  greenDiv: HTMLElement | null = null;
  blueDiv: HTMLElement | null = null;
  yellowDiv: HTMLElement | null = null;
  pointMarker: HTMLElement | null = null;
  clickBlocker: HTMLElement | null = null;
  btnRestart: HTMLElement | null = null;
  
  round: number = 1;
  expected: string = "";
  pressed: string = "";

  ngOnInit() {
    this.redDiv = document.getElementById('red');
    this.greenDiv = document.getElementById('green');
    this.blueDiv = document.getElementById('blue');
    this.yellowDiv = document.getElementById('yellow');
    this.pointMarker = document.getElementById('points');
    this.clickBlocker = document.getElementById('screenCover');
    this.btnRestart = document.getElementById('btnRestart');
    this.addClickListener(this.redDiv, 0);
    this.addClickListener(this.greenDiv, 1);
    this.addClickListener(this.blueDiv, 2);
    this.addClickListener(this.yellowDiv, 3);

    this.btnRestart?.addEventListener('click', () => {
      this.restart();
    });
    setTimeout(() => {
      this.shineNextSquare(0);
    }, 2000);
  }

  shineNextSquare(index: number) {
    if (index >= this.round) {
      this.clickBlocker?.classList.add("displayNone");
      return;
    }
    let randomIndex = Math.floor(Math.random() * 4);
    let squareElement: HTMLElement | null = null;
    switch (randomIndex) {
      case 0:
        squareElement = this.redDiv;
        break;
      case 1:
        squareElement = this.greenDiv;
        break;
      case 2:
        squareElement = this.blueDiv;
        break;
      case 3:
        squareElement = this.yellowDiv;
        break;
      default:
        break;
    }
  
    this.expected += randomIndex;
    this.shineSquare(squareElement);
    console.log
    setTimeout(() => {
      this.shineNextSquare(index + 1);
    }, 600);
  }

  shineSquare(element: HTMLElement | null) {
    if (element) {
      element.classList.add('brighten');
      setTimeout(() => {
        element?.classList.remove('brighten');
      }, 500);
    }
  }

  addClickListener(element: HTMLElement | null, pressed: number) {
    if (element) {
      element.addEventListener('click', () => {
        element.classList.add('brighten');
        setTimeout(() => {
          element.classList.remove('brighten');
        }, 500);
        this.pressed += pressed;
        this.checkString();
      });
    }
  }

  checkString(){
    let missed: boolean = false;
    console.log(this.expected);
    if(this.pressed.length == this.round)
    {
      for (let index = 0; index < this.pressed.length; index++) {
        if(this.pressed[index] != this.expected[index])
        {
          missed = true;
        }
      }
      this.clickBlocker?.classList.remove("displayNone");
      if(missed)
      {
        document.getElementById('finishScreen')?.classList.remove("hidden");
        return;
      }
      this.pressed = "";
      this.expected = "";
      if(this.pointMarker)
        this.pointMarker.textContent = "Puntos: " + this.round;
      this.round ++;
      setTimeout(() => {
        this.shineNextSquare(0);
      }, 2000);
    }
  }

  restart(){
    this.pressed = "";
    this.expected = "";
    this.round = 1;
    setTimeout(() => {
      this.shineNextSquare(0);
    }, 2000);
    if(this.pointMarker)
      this.pointMarker.textContent = "Puntos: 0";
    document.getElementById('finishScreen')?.classList.add("hidden");
  }
}
