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
//Excepción valor ya existente
class ExistingValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("The value " + param + " already exist", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}
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
    Publication;
    Synopsis;
    Image;

    constructor(title, nacionality, publication, synopsis, image) {
        if (!title) throw new EmptyValueException("title", title);
        if (!publication) throw new EmptyValueException("publication", publication);
        if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(publication)) throw InvalidValueException("publication", publication);
        this.Title = title;
        this.Nacionality = nacionality;
        this.Publication = publication;
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
    Username;
    Email;
    #Password;
    constructor(username, email, password) {
        if (!username) throw new InvalidValueException("username", username);
        if (!email) throw new InvalidValueException("email", email);
        if (!/[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?/.test(email))
            throw new InvalidValueException("email", email);
        if (!password) throw new InvalidValueException("password", password);
        if (!/[a-zA-Z0-9]{8}/.test(password)) throw new InvalidValueException("password", password);
        this.Username = username;
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
            category: "",
            production: [] // El array contiene las referencias al objeto production
        }
    ];
    actors = [];
    directors = [];
    constructor(name, user, production, categori, actor, director) {
        //compruebo que no estan vacios y que son del objeto deseado
        if (!name) throw new EmptyValueException("name", name);
        if (!user) throw new EmptyValueException("user", user);
        if (!(user instanceof User)) throw new InvalidAccessConstructorException("user", user);
        if (!production) throw new EmptyValueException("production", production);
        if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
        if (!categori) throw new EmptyValueException("categori", categori);
        if (!(categori instanceof Category)) throw new InvalidAccessConstructorException("categori", categori);
        if (!actor) throw new EmptyValueException("actor", actor);
        if (!(actor instanceof Person)) throw new InvalidAccessConstructorException("actor", actor);
        if (!director) throw new EmptyValueException("director", director);
        if (!(director instanceof Person)) throw new InvalidAccessConstructorException("director", director);

        this.Name = name;
        this.addUser(user);
        this.addProduction(production);
        this.addCatecogy(categori);
        this.addActor(actor);
        this.addDirector(director);
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
        this.categories.push(category);
        return this.categories.length;
    }

    removeCategory(category) {
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.categories.length && borrado == false) {
            if (this.categories[index].category == category.category) {
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
        for (let index = 0; index < this.users.length; index++) {
            if (this.users[index].Username == user.Username) throw new InvalidValueException("user", user);
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
        for (let index = 0; index < this.productions.length; index++) {
            if (this.productions[index].Name == production.Name) throw new InvalidValueException("production", production);
        }
        this.productions.push(production);
        return this.productions.length;
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
        this.directors.push(director);
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
            if (this.directors[index] == director) {
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
        let l = 0;
        while (l < this.categories.length) {
            l++;
        }
        if (l == this.categories.length) {
            this.addCatecogy(category);
        }
        let existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        if (production instanceof Array) {
            while (index < this.productions.length && existe == false) {
                cont = 0;
                while (j < production.length && existe == false) {
                    if (!(production[i] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                    if (this.productions[index] == production[j]) {
                        cont++;
                    }
                    j++;
                }
                if (cont == 0) {
                    this.addProduction(production);
                }
                index++;
            }
        } else {
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            while (index < this.categories.length && existe == false) {
                if (!(this.productions[index] == production)) {
                    cont++;
                }
                index++;
            }
            if (cont == 0) {
                this.addProduction(production);
            }
        }
        return this.categories.length;
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
        let array = this.productions;
        // Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
        return {
            *[Symbol.iterator]() {
                // Recorremos todos los autores menos el de por defecto.
                for (let i = 1; i < array.length; i++) {
                    for (let j = 1; j < array.length; i++) {
                        yield array[i][j];
                    }
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
console.log("Test");
let act = new Person("Paco", "lo", "la", "10/05/1990", "");
let act2 = new Person("Rosa", "lo", "la", "10/05/1990", "");
let act3 = new Person("Lis", "lo", "la", "10/05/1990", "");
let dir = new Person("Mac", "lo", "la", "10/05/1980", "");
let dir2 = new Person("Rocky", "lo", "la", "10/05/1980", "");
let user = new User("Lu", "lume@gmail.com", "12345678");
let user2 = new User("Mi", "lum@gmail.com", "12345678");
//let user4=new User("Lu","lume@gmail.com","123458");//error de contraseña
//let user3=new User("Lu","lu@gmail.com","12345678");//error el correo

let cat = new Category("accion", "accionada");
let cat2 = new Category("accion", "accionada");

let prod = new Production("Las llamas", "Español", "20/03/2010", "fuego", "a");
let v = new VideoSystem("Video", user, prod, cat, act, dir);
console.log(v.addActor(act2));
console.log(v.addUser(user2));
console.log(v.addCatecogy(cat2));
console.log(v.addDirector(dir2));
console.log(v.Name);
console.log(v.users);
console.log(v.productions);
console.log(v.categories);
console.log(v.actors);
console.log(v.directors);
console.log(v.assignCategory(cat,prod));

export {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException,
    AbstractClassException
};