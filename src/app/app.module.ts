import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CodemotionApp } from './app.component';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleDayPage } from '../pages/schedule-day/schedule-day';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SpeakersComponent } from '../pages/speakers/speakers';

import { AgendaData } from "../providers/agenda.provider"
@NgModule({
  declarations: [
    CodemotionApp,
    SchedulePage,
    ScheduleDayPage,
    SessionDetailPage,
    SpeakersComponent
  ],
  imports: [
    IonicModule.forRoot(CodemotionApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CodemotionApp,
    SchedulePage,
    ScheduleDayPage,
    SessionDetailPage,
    SpeakersComponent
  ],
  providers: [AgendaData]
})
export class AppModule {}
