// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { Injectable, Logger } from '@nestjs/common';
// import { AccountsService } from '../services/accounts.service';

// @Injectable()
// @ValidatorConstraint({ name: 'coreEngineCrud', async: true })
// export class CoreEngineCRUDValidator implements ValidatorConstraintInterface {
//   private logger = new Logger(IsEmailIDUnique.name);

//   constructor(private readonly accountsService: AccountsService) {}

//   public validate(email: string) {
//     this.logger.log('Validating emailId uniqueness');
//     return this.accountsService.isEmailIdUnique(email);
//   }

//   public defaultMessage(): string {
//     return 'Email id must be unique';
//   }
// }
