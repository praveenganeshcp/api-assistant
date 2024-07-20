import { Component } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { SwColumnDef, SwTableComponent } from 'ngx-simple-widgets';
import { SearchInputComponent } from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-application-users-grid',
  standalone: true,
  imports: [SwTableComponent, NgSwitch, NgSwitchCase, DatePipe, SearchInputComponent],
  templateUrl: './application-users-grid.component.html',
  styleUrls: ['./application-users-grid.component.scss'],
})
export class ApplicationUsersGridComponent {
  protected readonly columns: SwColumnDef[] = [
    { fieldName: '_id', label: 'ID', renderTemplate: false, flex: '1' },
    {
      fieldName: 'username',
      label: 'Username',
      renderTemplate: false,
      flex: '1',
    },
    {
      fieldName: 'emailId',
      label: 'Email ID',
      renderTemplate: false,
      flex: '1',
    },
    {
      fieldName: 'lastLoggedOn',
      label: 'Last logged on',
      renderTemplate: true,
      flex: '1',
    },
  ];

  protected readonly rows = [
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '2',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
    {
      _id: '1',
      username: 'Praveen',
      emailId: 'praveen@mail.com',
      lastLoggedOn: new Date(),
    },
  ];
}
