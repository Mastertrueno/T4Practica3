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
        if (!name) throw new InvalidValueException("name", name);
        if (!lastname1) throw new InvalidValueException("lastname1", lastname1);
        if (!born) throw new InvalidValueException("born", born);
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