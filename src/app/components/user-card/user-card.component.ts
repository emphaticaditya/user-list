import { Component, OnInit,EventEmitter, HostListener, Input, Output, } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input('userData') userData: any;
  constructor() { }

  ngOnInit() {
  }

}
