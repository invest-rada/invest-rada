import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { get } from 'lodash-es';

import { IUser } from '../../../models/user-data.model';

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Output() selectUser: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  // @ts-ignore
  _user: IUser;

  get user(): IUser {
    return this._user;
  }

  @Input('user') set user(user: IUser | null) {
    this._user = user || {} as IUser;
  }

  ngOnInit(): void {
  }

  onSelectUser() {
    this.selectUser.emit(get(this.user, 'userId', 0));
  }

}
