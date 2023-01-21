"use strict";
//importo las excepciones
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException,
    AbstractClassException
} from './BaseException.js';
//objeto persona
class Person {
    Name;
    Lastname1;
    Lastname2;
    Born;
    Picture;

    constructor(name, lastname1, lastname2, born, picture) {
        //compruebo que no estan vacios y que la fecha es valida
        if (!name) throw new EmptyValueException("name", name);
        if (!lastname1) throw new EmptyValueException("lastname1", lastname1);
        if (!born) throw new EmptyValueException("born", born);
        if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(born)) throw InvalidValueException("born", born);
        this.Name = name;
        this.Lastname1 = lastname1;
        this.Lastname2 = lastname2;
        this.Born = born;
        this.Picture = picture;
    }
    toString() {
        return this.constructor.Name + " " + this.Lastname1 + " " + this.Lastname2 + " nacido en " + this.Born + " " + this.Picture;
    }
}

class Category {
    Name;
    Description;

    constructor(name, description) {
        if (!name) throw new EmptyValueException("name", name);
        if (!description) throw new EmptyValueException("description", description);
        this.Name = name;
        this.Description = description;
    }
}

class Resource {
    Duration;
    Link;

    constructor(duration, link) {
        if (!duration) throw new EmptyValueException("duration", duration);
        if (Number.isNaN(duration)) throw new InvalidValueException("duration", duration);
        if (!link) throw new EmptyValueException("link", link);
        this.Duration = duration;
        this.Link = link;
    }
}

class Production {
    Title;
    Nacionality;
    Publlication;
    Synopsis;
    Image;

    constructor(title, nacionality, publlication, synopsis, image) {
        if (!title) throw new EmptyValueException("title", title);
        if (!nacionality) throw new EmptyValueException("nacionality", nacionality);
        if (!publlication) throw new EmptyValueException("publlication", publlication);
        if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(publlication)) throw InvalidValueException("publlication", publlication);
        if (!synopsis) throw new EmptyValueException("synopsis", synopsis);
        if (!image) throw new EmptyValueException("image", image);
        this.Title = title;
        this.Nacionality = nacionality;
        this.Publlication = publlication;
        this.Synopsis = synopsis;
        this.Image = image;
    }
}
class Movie {
    Resource;
    Locations;

    constructor(resource, locations) {
        if (!resource) throw new EmptyValueException("resource", resource);
        if (!locations) throw new EmptyValueException("locations", locations);
        if (!(resource instanceof (Resource))) throw new InvalidAccessConstructorException("resource", resource);
        if (!(locations instanceof (Coords))) throw new InvalidAccessConstructorException("locations", locations);
        this.Resource = resource;
        this.Locations = locations;
    }
}

class Serie {
    Resource;
    Locations;
    Seasons;
    constructor(resource, locations, seasons) {
        if (!resource) throw new EmptyValueException("resource", resource);
        if (!locations) throw new EmptyValueException("locations", locations);
        if (!(resource instanceof Resource)) throw new InvalidAccessConstructorException("resource", resource);
        if (!(locations instanceof Coords)) throw new InvalidAccessConstructorException("locations", locations);
        if (!seasons) throw new EmptyValueException("seasons", seasons);
        if (Number.isNaN(seasons)) throw new InvalidValueException("seasons", seasons);
        this.Resource = resource;
        this.Locations = locations;
        this.Seasons = seasons;
    }
}

class User {
    #Username;
    Email;
    #Password;
    constructor(username, email, password) {
        if (!username) throw new InvalidValueException("username", username);
        if (!email) throw new InvalidValueException("email", email);
        if (!/[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?/.test(email))
            throw new InvalidValueException("email", email);
        if (!password) throw new InvalidValueException("password", password);
        if (!/[a-zA-Z0-9]{8}/.test(password)) throw new InvalidValueException("password", password);
        this.#Username = username;
        this.Email = email;
        this.#Password = password;

    }
}

// Objeto Coords para definir coordenadas.
class Coords {
    #latitude;
    #longitude;

    constructor(latitude = 0, longitude = 0) {

        latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
        if (Number.isNaN(latitude) || latitude < -90 || latitude > 90)
            throw new InvalidValueException("latitude", latitude);
        longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
        if (Number.isNaN(longitude) || longitude < -180 || longitude > 180)
            throw new InvalidValueException("longitude", longitude);

        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    get latitude() {
        return this.#latitude;
    }
    set latitude(value) {
        value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
        if (Number.isNaN(value) || value < -90 || value > 90)
            throw new InvalidValueException("latitude", value);
        this.#latitude = value;
    }

    get longitude() {
        return this.#longitude;
    }
    set longitude(value) {
        value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
        if (Number.isNaN(value) || value < -180 || value > 180)
            throw new InvalidValueException("longitude", value);
        this.#longitude = value;
    }

    getSexagesimalLatitude() {
        let direction = this.latitude >= 0 ? "N" : "S";
        let latitude = Math.abs(this.latitude);
        let grades = Math.floor(latitude);
        let tmpMinutes = (latitude - grades) * 60;
        let minutes = Math.floor(tmpMinutes);
        let tmpSeconds = (tmpMinutes - minutes) * 60;
        let seconds = Math.round(tmpSeconds);

        return grades + "°" + minutes + "'" + seconds + "''" + direction;
    }


    getSexagesimalLongitude() {
        let direction = this.longitude >= 0 ? "E" : "W";
        let longitude = Math.abs(this.longitude);
        let grades = Math.floor(longitude);
        let tmpMinutes = (longitude - grades) * 60;
        let minutes = Math.floor(tmpMinutes);
        let tmpSeconds = (tmpMinutes - minutes) * 60;
        let seconds = Math.round(tmpSeconds);

        return grades + "°" + minutes + "'" + seconds + "''" + direction;
    }

}

class VideoSystem {
    Name;
    users = [];
    productions = [];
    categories = [ // Array contiene objeto literal con la categoría y un array con las imágenes de esa categoría
        {
            category: category,
            production: [production] // El array contiene las referencias al objeto Image
        }
    ];
    actors;
    directors;
    constructor(name, users, productions, categories, actors, directors) {
        //compruebo que no estan vacios y que son del objeto deseado
        if (!name) throw new EmptyValueException("name", name);
        if (!users) throw new EmptyValueException("users", users);
        if (!(users instanceof User)) throw new InvalidAccessConstructorException("users", users);
        if (!productions) throw new EmptyValueException("productions", productions);
        if (!(productions instanceof Production)) throw new InvalidAccessConstructorException("productions", productions);
        if (!categories) throw new EmptyValueException("categories", categories);
        if (!(categories instanceof Category)) throw new InvalidAccessConstructorException("categories", categories);
        if (!actors) throw new EmptyValueException("actors", actors);
        if (!(actors instanceof Person)) throw new InvalidAccessConstructorException("actors", actors);
        if (!directors) throw new EmptyValueException("directors", directors);
        if (!(directors instanceof Person)) throw new InvalidAccessConstructorException("directors", directors);

        this.Name = name;
        this.users = users;
        this.productions = productions;
        this.categories = categories;
        this.actors = actors;
        this.directors = directors;
    }
    get name() {
        return this.Name;
    }
    set name(value) {
        if (!value) throw new InvalidValueException("nombre", value);
        this.Name = value;
        return "Nombre cambiado";
    }
    get categories() {
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.categories;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    //añade una categoria a la lista
    addCatecogy(category) {
        if (!category) throw new EmptyValueException("categories", categories);
        if (!(category instanceof Category)) throw new InvalidAccessConstructorException("categories", categories);
        for (let index = 0; index < this.categories.length; index++) {
            if (this.categories[index] == category) throw new InvalidValueException("category", category);
        }
        this.categories.push(category);
        return this.categories.length;
    }

    removeCategory(category) {
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.categories.length && borrado == false) {
            if (this.categories[index].Name == category.Name) {
                this.categories.splice(index, 1);
                borrado = true;
            }
            index++;
        }
        if (borrado) {
            return this.categories.length;
        } else throw new InvalidValueException("category", category);
    }

    get users() {
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.users;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    addUser(user) {
        if (!user) throw new EmptyValueException("user", user);
        if (!(user instanceof User)) throw new InvalidAccessConstructorException("user", user);
        for (let index = 0; index < users.length; index++) {
            if (this.users[index].Name == user.Name) throw new InvalidValueException("user", user);
            if (this.users[index].Email == user.Email) throw new InvalidValueException("user", user);
        }
        this.users.push(user);
        return this.users.length;
    }
    removeUser(user) {
        if (!user) throw new EmptyValueException("user", user);
        if (!(user instanceof User)) throw new InvalidAccessConstructorException("user", user);
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.users.length && borrado == false) {
            if (this.users[index] == user) {
                this.users.splice(index, 1);
                borrado = true;
            }
            index++;
        }
        if (borrado) {
            return this.users.length;
        } else throw new InvalidValueException("user", user);
    }
    get productions() {
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.productions;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    addProduction(production) {
        if (!production) throw new EmptyValueException("production", production);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        for (let index = 0; index < production.length; index++) {
            if (this.productions[index].Name == production.Name) throw new InvalidValueException("production", production);
        }
        this.production.push(production);
        return this.production.length;
    }
    removeProduction(production) {
        if (!production) throw new EmptyValueException("production", production);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.productions.length && borrado == false) {
            if (this.productions[index] == production) {
                this.productions.splice(index, 1);
                borrado = true;
            }
            index++;
        }
        if (borrado) {
            return this.production.length;
        } else throw new InvalidValueException("production", production);
    }
    //getter de actores
    get actors() {
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.actors;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    //funcion que añade un actor a la lista
    addActor(actor) {
        //compruebo que es valido
        if (!actor) throw new EmptyValueException("actor", actor);
        if (!(actor instanceof Person)) throw new InvalidAccessConstructorException("actor", actor);
        for (let index = 0; index < this.actors.length; index++) {
            if (this.actors[index] == actor) throw new InvalidValueException("actor", actor);
        }
        this.actors.push(actor);
        return this.actors.length;
    }
    //funcion que quita un actor de la lista
    removeActor(actor) {
        if (!actor) throw new EmptyValueException("actor", actor);
        if (!(actor instanceof Person)) throw new InvalidAccessConstructorException("actor", actor);
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.actors.length && borrado == false) {
            if (this.actors[index] == actor) {
                this.actors.splice(index, 1);
                borrado = true;
            }
            index++;
        }
        if (borrado) {
            return this.actors.length;
        } else throw new InvalidValueException("actor", actor);
    }
    //getter de actores
    get directors() {
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.directors;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    //funcion que añade un actor a la lista
    addDirector(director) {
        //compruebo que es valido
        if (!director) throw new EmptyValueException("director", director);
        if (!(director instanceof Person)) throw new InvalidAccessConstructorException("director", director);
        for (let index = 0; index < this.directors.length; index++) {
            if (this.directors[index] == director) throw new InvalidValueException("director", director);
        }
        this.directors.push(actor);
        return this.directors.length;
    }
    //funcion que quita un actor de la lista
    removeDirector(director) {
        if (!director) throw new EmptyValueException("director", director);
        if (!(director instanceof Person)) throw new InvalidAccessConstructorException("director", director);
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.directors.length && borrado == false) {
            if (this.directors[index] == actor) {
                this.directors.splice(index, 1);
                borrado = true;
            }
            index++;
        }
        if (borrado) {
            return this.directors.length;
        } else throw new InvalidValueException("director", director);
    }
    assignCategory(category, production) {
        if (!category) throw new EmptyValueException("category", category);
        if (!production) throw new EmptyValueException("production", production);
        if (!(category instanceof Category)) throw new InvalidAccessConstructorException("category", category);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let existe = false;
        let index = 0;
        while (index < this.categories.length && existe == false) {
            index++;
        }
    }
    deassignCategory(category, production) {
        if (!category) throw new EmptyValueException("category", category);
        if (!production) throw new EmptyValueException("production", production);
        if (!(category instanceof Category)) throw new InvalidAccessConstructorException("category", category);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let existe = false;
        let index = 0;
        while (index < this.categories.length && existe == false) {
            index++;
        }
    }
    assignDirector(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let existe = false;
        let index = 0;
        while (index < this.categories.length && existe == false) {
            index++;
        }
    }
    deassignDirector(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let existe = false;
        let index = 0;
        while (index < this.categories.length && existe == false) {
            index++;
        }
    }
    assignActor(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let existe = false;
        let index = 0;
        while (index < this.categories.length && existe == false) {
            index++;
        }
    }
    deassignActor(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        let existe = false;
        let index = 0;
        while (index < this.categories.length && existe == false) {
            index++;
        }
    }

    getCast(production) {
        if (!production) throw new EmptyValueException("production", production);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.directors;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    getProductionsDirector(person) {
        if (!person) throw new EmptyValueException("person", person);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.directors;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    getProductionsActor(person) {
        if (!person) throw new EmptyValueException("person", person);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.directors;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
    getProductionsCategory(category) {
        if (!category) throw new EmptyValueException("category", category);
        if (!(category instanceof Category)) throw new InvalidAccessConstructorException("category", category);
        // referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
        let array = this.directors;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    yield array[i];
                }
            }
        }
    }
}

//test
