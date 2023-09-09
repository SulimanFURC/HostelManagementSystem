import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})
export class MyModalComponent implements OnInit {

  @Input() title: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
