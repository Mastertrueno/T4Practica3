"use strict";
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException,
    AbstractClassException
} from './BaseException.js';
class Person {
    name;
    lastname1;
    lastname2;
    born;
    picture;

    constructor(name, lastname1, lastname2, born, picture) {
        if (!name) throw new EmptyValueException("name", name);
        if (!lastname1) throw new EmptyValueException("lastname1", lastname1);
        if (!born) throw new EmptyValueException("born", born);
        if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(born)) throw InvalidValueException("born", born);
        this.name = name;
        this.lastname1 = lastname1;
        this.lastname2 = lastname2;
        this.born = born;
        this.picture = picture;
    }
    toString() {
        return this.constructor.name + " " + this.lastname1 + " nacido en " + this.born + " " + this.picture;
    }
}

class Category {
    name;
    description;

    constructor(name, description) {
        if (!name) throw new EmptyValueException("name", name);
        if (!description) throw new EmptyValueException("description", description);
        this.name = name;
        this.description = description;
    }
}

class Resource {
    duration;
    link;

    constructor(duration, link) {
        if (!duration) throw new EmptyValueException("duration", duration);
        if (duration.isNaN) throw new InvalidValueException("duration", duration);
        if (!link) throw new EmptyValueException("link", link);
        this.duration = duration;
        this.link = link;
    }
}

class Production {
    title;
    nacionality;
    publlication;
    synopsis;
    image;

    constructor(title, nacionality,publlication,synopsis,image) {
        if (!title) throw new EmptyValueException("title", title);
        if (!nacionality) throw new EmptyValueException("nacionality", nacionality);
        if (!publlication) throw new EmptyValueException("publlication", publlication);
        if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(publlication)) throw InvalidValueException("publlication", publlication);
        if (!synopsis) throw new EmptyValueException("synopsis", synopsis);
        if (!image) throw new EmptyValueException("image", image);
        this.title = title;
        this.nacionality = nacionality;
        this.publlication = publlication;
        this.synopsis = synopsis;
        this.image = image;
    }
}
// Objeto Coords para definir coordenadas.
class Coords {
	#latitude;
	#longitude;

	constructor(latitude = 0, longitude = 0){

		latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
		if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
			throw new InvalidValueException("latitude", latitude);
		longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
		if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
			throw new InvalidValueException("longitude", longitude);
	
		this.#latitude = latitude;
		this.#longitude = longitude;		
	}

	get latitude(){
		return this.#latitude;
	}
	set latitude(value){
		value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
		if (Number.isNaN(value)  || value < -90 || value > 90) 
			throw new InvalidValueException("latitude", value);
		this.#latitude = value;
	}

	get longitude(){
		return this.#longitude;
	}
	set longitude(value){
		value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
		if (Number.isNaN(value)  || value < -180 || value > 180) 
			throw new InvalidValueException("longitude", value);
		this.#longitude = value;
	}

	getSexagesimalLatitude(){
		let direction = this.latitude >= 0 ? "N" : "S";
		let latitude = Math.abs(this.latitude);
		let grades =  Math.floor (latitude);
		let tmpMinutes = (latitude - grades) * 60;
		let minutes = Math.floor (tmpMinutes);
		let tmpSeconds = (tmpMinutes - minutes) * 60;
		let seconds = Math.round (tmpSeconds);
	
		return grades + "°" + minutes + "'" + seconds + "''" + direction; 	
	} 


	getSexagesimalLongitude(){	
		let direction = this.longitude >= 0 ? "E" : "W";
		let longitude = Math.abs(this.longitude);
		let grades =  Math.floor (longitude);
		let tmpMinutes = (longitude - grades) * 60;
		let minutes = Math.floor (tmpMinutes);
		let tmpSeconds = (tmpMinutes - minutes) * 60;
		let seconds = Math.round (tmpSeconds);
	
		return grades + "°" + minutes + "'" + seconds + "''" + direction; 
	}
	
}

class Movie {
    resource;
    locations;

    constructor(resource, locations) {
        if (!resource) throw new EmptyValueException("resource", resource);
        if (!locations) throw new EmptyValueException("locations", locations);
        if (!(resource instanceof(Resource))) throw new InvalidAccessConstructorException("resource", resource);
        if (!(locations instanceof(Coords))) throw new InvalidAccessConstructorException("locations", locations);
        this.resource = resource;
        this.locations = locations;
    }
}