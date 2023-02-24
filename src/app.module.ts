import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { EventTypesModule } from './event-types/event-types.module';
import { CompaniesModule } from './companies/companies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { mongoURI } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    EventsModule,
    UsersModule,
    EventTypesModule,
    CompaniesModule,
    AvailabilitiesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
