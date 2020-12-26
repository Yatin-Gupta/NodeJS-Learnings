const events = require('events');
const util = require('util');

const Person = function(name) {
    this.name = name;
    this.speak = (msg) => {
        console.log(`${this.name} speaks "${msg}"`);
    };
};

// Inherits EventEmiiter to Person, so Person will behave as EventEmitter
util.inherits(Person, events.EventEmitter);
const sheldon = new Person('Sheldon Cooper');
const penny = new Person('Penny');

// See, we are able to apply on Person object as Person has inherieted EventEmitter
sheldon.on('speak', sheldon.speak);
penny.on('speak', penny.speak);

sheldon.emit('speak', "E2 = mc2");
penny.emit('speak', 'Stop it Sheldon');
