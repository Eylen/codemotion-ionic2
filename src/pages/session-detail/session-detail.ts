import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Slot } from "../../app/shared/agenda"

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  slot: Slot;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.slot = navParams.data;
  }

}
