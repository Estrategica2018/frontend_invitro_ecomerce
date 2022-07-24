import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.scss'],
})
export class NetworkStatusComponent implements OnInit {
  
  netStatusError: any;

  constructor() { }

  ngOnInit() {

    fromEvent(window,'offline').pipe(
      debounceTime(100)).subscribe((event:Event)=>{
        this.netStatusError = event.type;
      }
    );

    fromEvent(window,'online').pipe(
      debounceTime(100)).subscribe((event:Event)=>{
        this.netStatusError = event.type;
      }
    );
  }

}
