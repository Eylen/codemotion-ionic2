import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { AgendaData } from "../../providers/agenda.provider"
import { Agenda, AgendaDay } from "../../app/shared/agenda"

import { ScheduleDayPage } from "../schedule-day/schedule-day"

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers: [AgendaData]
})
export class SchedulePage{
  agenda: Agenda;
  private errorMessage: string;
  tabs : any = [{title:'pepep', root: ScheduleDayPage, icon:'calendar'}];
  tabSelectedIndex: number;

  constructor(navParams: NavParams, private agendaData: AgendaData) {
    agendaData.getAgenda().then(data => {
      this.agenda = data;
      this.agenda.days.forEach((day: AgendaDay, index) => {
        if (index == 0){
          this.tabs[0].title = day.name;
        } else {
          this.tabs.push({title: day.name, root: ScheduleDayPage, icon: "calendar"});
        }
      })

      
    });
    this.tabSelectedIndex = navParams.data.tabIndex || 0;
  }
}
