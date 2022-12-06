import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {
  @Input() height = 100;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  search(input: any) {
    this.onSearch.emit(input.target.value);
  }
}
