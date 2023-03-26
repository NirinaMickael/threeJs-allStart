import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VirtualVisit } from './VirtualVisit';

@Component({
  selector: 'app-virtual-visit',
  templateUrl: './virtual-visit.component.html',
  styleUrls: ['./virtual-visit.component.scss']
})
export class VirtualVisitComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const VV = new VirtualVisit('#virtual-visit');
    VV.init();
  }

}
