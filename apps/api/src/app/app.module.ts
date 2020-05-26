import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './RBAC/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from './RBAC/admins/admins.module';
import { environment } from '../environments/environment';
import { getMetadataArgsStorage } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.mysql_01.host,
      port: environment.mysql_01.port,
      username: environment.mysql_01.username,
      password: environment.mysql_01.password,
      database: environment.mysql_01.database,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: false,
      logging: ["query","error"]
    }),
    UsersModule,
    AuthModule,
    AdminsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() {

  }
}
