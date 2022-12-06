import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delta-indicator',
  templateUrl: './delta-indicator.component.html',
  styleUrls: ['./delta-indicator.component.scss']
})
export class DeltaIndicatorComponent implements OnInit {
  @Input() delta = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getColor(): 'danger' | 'dark' | 'success' {
    if (this.delta > 0) {
      return 'success'
    }

    if (this.delta < 0) {
      return 'danger'
    }

    return 'dark'
  }

}
