import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [AccountsModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
