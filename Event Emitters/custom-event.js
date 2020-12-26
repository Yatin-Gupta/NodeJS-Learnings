const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('custom-event', (msg) => {
    console.log(`Event Log: ${msg}`);
});

eventEmitter.emit('custom-event', 'Hello');