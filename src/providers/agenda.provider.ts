import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import {Agenda, AgendaDay, Track, Slot} from "../app/shared/agenda";
import { Observable }     from 'rxjs/Observable';

import './rxjs-operators';
 
@Injectable()
export class AgendaData {
	private agendaId: number = 5753906952929280;
	private agendaUrl: string = "https://www.koliseo.com/codemotion/codemotion-madrid/r4p/";
	private agendaUrlEnd: String = "/agenda";
	public agenda: Agenda;
	
	constructor(private http: Http){}

	load() {
		if (this.agenda) {
			// already loaded data
			return Promise.resolve(this.agenda);
		}

		return new Promise(resolve => {
			// We're using Angular Http provider to request the data,
			// then on the response it'll map the JSON data to a parsed JS object.
			// Next we process the data and resolve the promise with the new data.
    		let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this.http.get(this.agendaUrl + this.agendaId + this.agendaUrlEnd, options).subscribe(res => {
				// we've got back the raw data, now generate the core schedule data
				// and save the data for later reference
				this.agenda = this.extractData(res);
				resolve(this.agenda);
			});
		});

		/*let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
	    return this.http.get(this.agendaUrl + id + this.agendaUrlEnd, options)
	                    .map(this.extractData)
	                    .catch(this.handleError);*/
    }

	getAgenda(){
		return this.load().then(agenda => {
			return agenda;
		});
	}

	getTimeline(dayIndex, queryText = '', excludeTracks = [], segment = 'all') {
    return this.load().then(data => {
      let day = data.days[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.tracks.forEach(track => {
        track.hide = true;

        track.slots.forEach(slot => {
          // check if this session should show or not
          //this.filterSlot(slot, queryWords, excludeTracks, segment);

          if (!slot.hide) {
            // if this session is not hidden then this track should show
            track.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });
  }


  filterSlot(session, queryWords, excludeTracks, segment) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach(queryWord => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach(trackName => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    /*if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }*/

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }
    private extractData(res: Response) {
	    let body = res.json();
	    this.agenda = new Agenda(body);
	    return this.agenda;
	}
	private handleError (error: any) {
	    // In a real world app, we might use a remote logging infrastructure
	    // We'd also dig deeper into the error to get a better message
	    let errMsg = (error.message) ? error.message :
	      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.error(errMsg); // log to console instead
	    return Observable.throw(errMsg);
	}
}