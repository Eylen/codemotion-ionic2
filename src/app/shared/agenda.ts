import {SlotType, ContentType, SessionLevel } from "./enums"

export class Agenda {
	id: number;
	published: boolean;
	days: Array<AgendaDay> = [];

	constructor(jsonObject){
		this.id = jsonObject.id;
		this.published = jsonObject.id;
		jsonObject.days.forEach((dayJson) =>{
			this.days.push(new AgendaDay(dayJson));
		})
	}
}

export class AgendaDay {
	id: number;
	name: string;
	tracks: Array<Track> = [];
	shownSessions: number = 0;

	constructor(dayJson){
		this.id = dayJson.id;
		this.name = dayJson.name;
		dayJson.tracks.forEach((trackJson) => {
			this.tracks.push(new Track(trackJson));
		})
	}
}

export class Track {
	id: number;
	name: string;
	slots: Array<Slot> = [];
	hide: boolean = false;

	constructor(trackJson){
		this.id = trackJson.id;
		this.name = trackJson.name;
		trackJson.slots.forEach((slotJson) => {
			this.slots.push(new Slot(slotJson));
		})
	}
}

export class Slot {
	id: number;
	type: SlotType;
	start: String;
	end: String;
	title: string;
	description: string;
	authors: Array<Author> = [];
	hide: boolean = false;

	language: string[] = [];
	talkLanguage: string[] = [];
	level: string[] = [];
	technology: string[] = [];
	contentType: string[] = [];

	constructor(slotJson){
		this.id = slotJson.id;
		if (!slotJson.contents){
			this.type = SlotType.LUNCH;
		} else {
			this.type = SlotType[SlotType[slotJson.contents.type]];
			this.title = slotJson.contents.title;
			this.description = slotJson.contents.description;
			this.start = slotJson.start;
			this.end = slotJson.end;
			console.log(slotJson.contents.authors)
			if (slotJson.contents.authors){
				slotJson.contents.authors.forEach((authorJson) => {
					this.authors.push(new Author(authorJson));
				})
			}

			if (slotJson.contents.tags){
				var tag = slotJson.contents.tags;
				
				tag.Language.forEach((language) =>{
					this.language.push(language);
				});
				tag["Language of the talk/workshop"].forEach((talkLanguage) => {
					this.talkLanguage.push(talkLanguage);
				});
				tag.Level.forEach((level) => {
					//this.level.push(SessionLevel[SessionLevel[level.toUpperCase()]]);
					this.level.push(level);
				});
				tag.Technology.forEach((technology) => {
					this.technology.push(technology);
				});
				tag["Type of Proposal"].forEach((proposalType) => {
					//this.contentType.push(ContentType[ContentType[proposalType.toUpperCase()]])
					this.contentType.push(proposalType);
				})
			}
		}
	}
}

export class Author {
	id: number;
	uuid: string;
	name: string;
	avatar: string;
	description: string;

	constructor(authorJson){
		this.id = authorJson.id;
		this.uuid = authorJson.uuid;
		this.name = authorJson.name;
		this.avatar = authorJson.avatar;
		this.description = authorJson.description;
	}
}