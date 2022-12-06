import { Component, Input } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public currentUser$ = this.userData.currentUser$;

  constructor(
    private classToggler: ClassToggleService,
    private userData: UserDataService,
  ) {
    super();
  }
}
