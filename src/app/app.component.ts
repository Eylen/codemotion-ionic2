import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakersComponent } from '../pages/speakers/speakers';

import { AgendaData } from "../providers/agenda.provider"

@Component({
  templateUrl: 'app.template.html'
})
export class CodemotionApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SchedulePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, agendaData: AgendaData) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Agenda', component: SchedulePage },
      { title: 'Speakers', component: SpeakersComponent }
    ];

    agendaData.getAgenda();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
