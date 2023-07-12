import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './typeorm/entities/Planning';
import { PlanningsModule } from './plannings/plannings.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivitiesModule } from './activities/activities.module';
import { Activity } from './typeorm/entities/Activity';
import { Indisponibility } from './typeorm/entities/Indisponibility';
import { CartographieDitw } from './typeorm/entities/CartographieDitw';
import { FusionDatapfProgiciel } from './typeorm/entities/FusionDatapfProgiciel';
import { IndisponibilitiesModule } from './indisponibilities/indisponibilities.module';
import { EnvironmentsModule } from './environments/environments.module';
import { Task } from './typeorm/entities/Task';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Anomalie } from './typeorm/entities/testingManage/anomalie.entity';
import { CasDeTest } from './typeorm/entities/testingManage/casDeTest.entity';
import { ScenarioDeTest } from './typeorm/entities/testingManage/scenarioDeTest.entity';
import { Releas } from './typeorm/entities/testingManage/releas.entity';
import { Testeur } from './typeorm/entities/testingManage/testeur.entity';
import { Ticket } from './typeorm/entities/testingManage/ticket.entity';
import { AnomalieModule } from './anomalie/anomalie.module';
import { CasDeTestModule } from './cas-de-test/cas-de-test.module';
import { ReleasModule } from './releas/releas.module';
import { ScenarioDeTestModule } from './scenario-de-test/scenario-de-test.module';
import { TesteurModule } from './testeur/testeur.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysqlpass',
      database: 'env_release_management',
      entities: [Planning, Task, Activity, Indisponibility, CartographieDitw, FusionDatapfProgiciel, User,Anomalie, CasDeTest,ScenarioDeTest,Releas,Testeur,Ticket],
      synchronize: true,
    }),
  }),
    PlanningsModule,
    TasksModule,
    ActivitiesModule,
    IndisponibilitiesModule,
    EnvironmentsModule,
    UsersModule,
    AnomalieModule,
    CasDeTestModule,
    ReleasModule,
    ScenarioDeTestModule,
    TesteurModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
