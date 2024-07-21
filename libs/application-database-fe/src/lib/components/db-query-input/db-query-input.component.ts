import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DropdownOptions, SwDropdownComponent } from 'ngx-simple-widgets';
import { JsonInputComponent } from '@api-assistant/commons-fe';
import { ALLOWED_DB_OPERATIONS_IN_ENDPOINT } from '@api-assistant/endpoints-fe';

@Component({
  selector: 'api-assistant-db-query-input',
  standalone: true,
  imports: [SwDropdownComponent, JsonInputComponent],
  templateUrl: './db-query-input.component.html',
  styleUrls: ['./db-query-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbQueryInputComponent {
  protected readonly options: DropdownOptions[] = [
    { label: 'Insert one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne },
    {
      label: 'Insert many',
      value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertMany,
    },
    { label: 'Find one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne },
    { label: 'Insert many', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find },
    { label: 'Update one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateOne },
    {
      label: 'Update many',
      value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateMany,
    },
    { label: 'Delete one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteOne },
    {
      label: 'Delete many',
      value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteMany,
    },
  ];
}
