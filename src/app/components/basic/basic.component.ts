import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  message = "Hello, World!";
  constructor() { }

  ngOnInit() {
  }

  changeMessage() {
    this.message = 'Thanks!';
  }
}
