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
class ExistetingValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("The value " + param + " already existet", fileName, lineNumber);
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
    categories = [];
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
    addCatecogy(catego) {
        if (!catego) throw new EmptyValueException("catego", catego);
        if (!(catego instanceof Category)) throw new InvalidAccessConstructorException("catego", catego);
        /* let categ = [ // Array contiene objeto literal con la categoría y un array con las imágenes de esa categoría
             {
                 category: catego,
                 production: [] // El array contiene las referencias al objeto production
             }
         ];*/
        let categ = [catego, []];
        this.categories.push(categ);
        return this.categories.length;
    }

    removeCategory(category) {
        let borrado = false;
        let index = 0;
        //busca el nombre del curso a borrar
        while (index < this.categories.length && borrado == false) {
            if (this.categories[index][0].Name == category.Name) {
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
            if (this.productions[index].Title == production.Title) throw new InvalidValueException("production", production);
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
        let acto = [actor, []];
        this.actors.push(acto);
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
        let direc = [director, []];
        this.directors.push(direc);
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
        //compruebo que son validos
        if (!category) throw new EmptyValueException("category", category);
        if (!production) throw new EmptyValueException("production", production);

        if (!(category instanceof Category)) throw new InvalidAccessConstructorException("category", category);
        let l = 0;
        let existe = false;
        let pos = 0;
        //compruebo si la categoria existe
        while (l < this.categories.length && existe == false) {
            if (this.categories[l][0].Name == category.Name) {
                //si existe guardo su posicion
                existe = true;
                pos = l;
            }
            l++;
        }
        //la añado si no lo hace
        if (!existe) {
            this.addCatecogy(category);
            pos = this.categories.length - 1;
        }
         existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        //si es un array de producciones
        if (production instanceof Array) {
            //mientras no se llegue al final del array dado
            while (index < production.length) {
                existe = false;
                //compruebo que cada dato del array es valido
                if (!(production[index] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                //compara el productions con cada elemento del array dado
                while (j < this.productions.length && existe == false) {
                    if (production[index] == this.productions[j]) {
                        existe = true;
                    }
                    j++;
                }
                //si no existe se añade
                if (!existe) {
                    this.addProduction(production[index]);
                }
                //se asigna a la categoria correspondiente
                this.categories[pos][1].push(production[index]);
                index++;
            }
        } else {//si es solo una produccion
            //compruebo que el dato es valido
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            //compruebo si existe
            while (index < this.categories.length && existe == false) {
                if (!(this.productions[index] == production)) {
                    existe=true;
                }
                index++;
            }
            //si no  existe se añade
            if (!existe) {
                this.addProduction(production);
            }
            //console.log(this.categories[pos][1]) ;
            //se añade a la categoria correspondiente
            this.categories[pos][1].push(production);
        }
        return this.categories[pos].length;
    }
    deassignCategory(category, production) {
        if (!category) throw new EmptyValueException("category", category);
        if (!production) throw new EmptyValueException("production", production);
        if (!(category instanceof Category)) throw new InvalidAccessConstructorException("category", category);
        let l = 0;
        let existe = false;
        let pos = 0;
        //compruebo si la categoria existe
        while (l < this.categories.length && existe == false) {
            if (this.categories[l][0].Name == category.Name) {
                //si existe guardo su posicion
                existe = true;
                pos = l;
            }
            l++;
        }
        //error si no existe
        if (!existe) throw new InvalidValueException("category", category);
         existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        //si es un array de producciones
        if (production instanceof Array) {
            //mientras no se llegue al final del array dado
            while (index < production.length) {
                existe = false;
                //compruebo que cada dato del array es valido
                if (!(production[index] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                //compara el productions con cada elemento del array dado
                while (j < this.categories.length && existe == false) {
                    if (production[index] == this.categories[pos][1][j]) {
                        existe = true;
                        cont=j;
                    }
                    j++;
                }
                //si no existe se ignora
                if (existe) {
                    //se borra la produccion correspondiente
                    this.categories[pos][1].splice(cont,1);
                }
                j = 0;
                index++;
            }
        } else {//si es solo una produccion
            //compruebo que el dato es valido
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            //compruebo si existe
            existe=false;
            index=0;
            while (index < this.categories.length && existe == false) {
                if ((this.productions[index] == production)) {
                    existe=true;
                }
                index++;
            }
            //si existe se añade
            if (!existe) {
                this.addProduction(production);
            }
            //console.log(this.categories[pos][1]) ;
            index=0;
            cont=0;
            while (index < this.categories.length && existe == false) {
                if ((this.categories[pos][1][index].Title == production.Title)) {
                    existe=true;
                    cont=index;
                }
                index++;
            }
            this.categories[pos][1].splice(cont,1);
        }
        return this.categories[pos].length;
    }
    assignDirector(person, production) {
        //compruebo que son validos
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        let l = 0;
        let existe = false;
        let pos = 0;
        //compruebo si la categoria existe
        while (l < this.directors.length && existe == false) {
            if (this.directors[l][0].Name == person.Name) {
                //si existe guardo su posicion
                existe = true;
                pos = l;
            }
            l++;
        }
        //la añado si no lo hace
        if (!existe) {
            this.addDirector(person);
            pos = this.categories.length - 1;
        }
         existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        //si es un array de producciones
        if (production instanceof Array) {
            //mientras no se llegue al final del array dado
            while (index < production.length) {
                existe = false;
                //compruebo que cada dato del array es valido
                if (!(production[index] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                //compara el productions con cada elemento del array dado
                while (j < this.productions.length && existe == false) {
                    if (production[index] == this.productions[j]) {
                        existe = true;
                    }
                    j++;
                }//si no existe se añade
                if (!existe) {
                    this.addProduction(production[index]);
                }
                //se asigna a la categoria correspondiente
                this.directors[pos][1].push(production[index]);
                index++;
            }
        } else {//si es solo una produccion
            //compruebo que el dato es valido
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            //compruebo si existe
            while (index < this.directors.length && existe == false) {
                if (!(this.productions[index] == production)) {
                    cont++;
                }
                index++;
            }
            //si existe se añade
            if (cont == 0) {
                this.addProduction(production);
            }
            //console.log(this.categories[pos][1]) ;
            //se añade a la categoria correspondiente
            this.directors[pos][1].push(production);
        }
        return this.directors[pos].length;
    }
    deassignDirector(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        let l = 0;
        let existe = false;
        let pos = 0;
        //compruebo si la categoria existe
        while (l < this.directors.length && existe == false) {
            if (this.directors[l][0].Name == person.Name) {
                //si existe guardo su posicion
                existe = true;
                pos = l;
            }
            l++;
        }
        //error si no existe
        if (!existe) throw new InvalidValueException("category", category);
         existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        //si es un array de producciones
        if (production instanceof Array) {
            //mientras no se llegue al final del array dado
            while (index < production.length) {
                existe = false;
                //compruebo que cada dato del array es valido
                if (!(production[index] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                //compara el productions con cada elemento del array dado
                while (j < this.directors.length && existe == false) {
                    if (production[index] == this.directors[pos][1][j]) {
                        existe = true;
                        cont=j;
                    }
                    j++;
                }
                //si no existe se ignora
                if (existe) {
                    //se borra la produccion correspondiente
                    this.directors[pos][1].splice(cont,1);
                }
                j = 0;
                index++;
            }
        } else {//si es solo una produccion
            //compruebo que el dato es valido
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            //compruebo si existe
            existe=false;
            index=0;
            while (index < this.directors.length && existe == false) {
                if ((this.productions[index] == production)) {
                    existe=true;
                }
                index++;
            }
            //si existe se añade
            if (!existe) {
                this.addProduction(production);
            }
            //console.log(this.directors[pos][1]) ;
            index=0;
            cont=0;
            
            while (index < this.directors.length && existe == false) {
                console.log(this.directors[pos][1][index]);
                if ((this.directors[pos][1][index].Title == production.Title)) {
                    existe=true;
                    cont=index;
                }
                index++;
            }
            this.directors[pos][1].splice(cont,1);
        }
        return this.directors[pos].length;
    }
    assignActor(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        let l = 0;
        let existe = false;
        let pos = 0;
        //compruebo si la categoria existe
        while (l < this.actors.length && existe == false) {
            if (this.actors[l][0].Name == person.Name) {
                //si existe guardo su posicion
                existe = true;
                pos = l;
            }
            l++;
        }
        //la añado si no lo hace
        if (!existe) {
            this.addDirector(person);
            pos = this.categories.length - 1;
        }
         existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        //si es un array de producciones
        if (production instanceof Array) {
            //mientras no se llegue al final del array dado
            while (index < production.length) {
                existe = false;
                //compruebo que cada dato del array es valido
                if (!(production[index] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                //compara el productions con cada elemento del array dado
                while (j < this.productions.length && existe == false) {
                    if (production[index] == this.productions[j]) {
                        existe = true;
                    }
                    j++;
                }//si no existe se añade
                if (!existe) {
                    this.addProduction(production[index]);
                }
                //se asigna a la categoria correspondiente
                this.actors[pos][1].push(production[index]);
                index++;
            }
        } else {//si es solo una produccion
            //compruebo que el dato es valido
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            //compruebo si existe
            while (index < this.actors.length && existe == false) {
                if (!(this.productions[index] == production)) {
                    cont++;
                }
                index++;
            }
            //si existe se añade
            if (cont == 0) {
                this.addProduction(production);
            }
            //console.log(this.categories[pos][1]) ;
            //se añade a la categoria correspondiente
            this.actors[pos][1].push(production);
        }
        return this.actors[pos].length;
    }
    deassignActor(person, production) {
        if (!person) throw new EmptyValueException("person", person);
        if (!production) throw new EmptyValueException("production", production);
        if (!(person instanceof Person)) throw new InvalidAccessConstructorException("person", person);
        let l = 0;
        let existe = false;
        let pos = 0;
        //compruebo si la categoria existe
        while (l < this.actors.length && existe == false) {
            if (this.actors[l][0].Name == person.Name) {
                //si existe guardo su posicion
                existe = true;
                pos = l;
            }
            l++;
        }
        //error si no existe
        if (!existe) throw new InvalidValueException("person", person);
         existe = false;
        let index = 0;
        let j = 0;
        let cont = 0;
        //si es un array de producciones
        if (production instanceof Array) {
            //mientras no se llegue al final del array dado
            while (index < production.length) {
                existe = false;
                //compruebo que cada dato del array es valido
                if (!(production[index] instanceof Production)) throw new InvalidAccessConstructorException("production", production);
                //compara el productions con cada elemento del array dado
                while (j < this.actors.length && existe == false) {
                    if (production[index] == this.actors[pos][1][j]) {
                        existe = true;
                        cont=j;
                    }
                    j++;
                }
                //si no existe se ignora
                if (existe) {
                    //se borra la produccion correspondiente
                    this.actors[pos][1].splice(cont,1);
                }
                j = 0;
                index++;
            }
        } else {//si es solo una produccion
            //compruebo que el dato es valido
            if (!(production instanceof Production)) throw new InvalidAccessConstructorException("production", production);
            //compruebo si existe
            existe=false;
            index=0;
            while (index < this.actors.length && existe == false) {
                if ((this.productions[index] == production)) {
                    existe=true;
                }
                index++;
            }
            //si existe se añade
            if (!existe) {
                this.addProduction(production);
            }
            //console.log(this.actors[pos][1]) ;
            index=0;
            cont=0;
            while (index < this.actors.length && existe == false) {
                if ((this.actors[pos][1][index].Title == production.Title)) {
                    existe=true;
                    cont=index;
                }
                index++;
            }
            this.actors[pos][1].splice(cont,1);
        }
        return this.actors[pos].length;
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
                    yield array[i][j];
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
let cat2 = new Category("Romamce", "accionada");

let prod = new Production("Las llamas", "Español", "20/03/2010", "fuego", "a");
let prod2 = new Production("Sparta", "Español", "20/03/2010", "esto es esparta", "a");
let prod3 = new Production("Mellizos", "Español", "20/03/2010", "o gemelos?", "a");

let v = new VideoSystem("Video", user, prod, cat, act, dir);
console.log("Insercion de datos");
console.log(v.addActor(act2));
console.log(v.addUser(user2));
console.log(v.addCatecogy(cat2));
console.log(v.addDirector(dir2));
console.log(v.Name);
console.log(v.users);
console.log(v.productions);

console.log(v.actors);
console.log(v.directors);
console.log("Categorias");
console.log(v.categories);
console.log(v.assignCategory(cat, prod));
console.log(v.categories);
let prods = [prod2, prod3];
console.log(v.assignCategory(cat2, prods));
console.log(v.categories);
console.log(v.deassignCategory(cat2, prod2));
console.log(v.categories);
console.log(v.assignCategory(cat2, prod2));

console.log(v.categories);
console.log(v.deassignCategory(cat2, prods));
console.log(v.categories);
console.log("Directores");
console.log(v.assignDirector(dir, prod));
console.log(v.directors);
console.log(v.assignDirector(dir2, prods));
console.log(v.directors);
console.log(v.deassignDirector(dir, prod));
console.log(v.directors);
console.log(v.deassignDirector(dir2, prods));
console.log(v.directors);
//console.log(v.categories[1][1][1]);
console.log("Actores");
console.log(v.assignActor(act, prod));
console.log(v.actors);
console.log(v.assignActor(act2, prods));
console.log(v.actors);
console.log(v.deassignActor(act, prod));
console.log(v.directors);
console.log(v.deassignActor(act2, prods));
console.log(v.directors);

export {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException,
    AbstractClassException
};