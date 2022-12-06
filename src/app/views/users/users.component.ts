import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';


@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit {
  public users = this.userData.users;
  public currentUser$ = this.userData.currentUser$;

  constructor(
    private userData: UserDataService,
  ) {
  }

  ngOnInit(): void {}

  onSelectUser(userId: number) {
    console.log('TODO: switch user in service', userId);
    this.userData.switchUser(userId);
  }
}
