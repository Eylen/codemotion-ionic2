import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { AgendaDay, Track , Slot} from "../../app/shared/agenda";
import { AgendaData } from "../../providers/agenda.provider";
import { SessionDetailPage } from "../session-detail/session-detail"

@Component({
  
  templateUrl: 'schedule-day.html'
})
export class ScheduleDayPage {
  public tracks:Track[] = [];
  public shownSessions: number;

  constructor(navParams: NavParams,public navCtrl: NavController, agendaData: AgendaData){
    console.log("constructor agendaTab")
    console.log(navParams);
    agendaData.getTimeline(navParams.data).then(data => {
      this.tracks = data.tracks;
      console.log(this.tracks)
      this.shownSessions = data.shownSessions;
    });
  }

  goToSlotDetail(slot: Slot){
    this.navCtrl.push(SessionDetailPage, slot);
  }
}