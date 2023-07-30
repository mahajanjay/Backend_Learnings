const EventEmmiter = require('node:events');

const emitter = new EventEmmiter();

emitter.on('order-pizza', (size, toppings) => {
    console.log(`${size} ${toppings} pizza has been ordered!`);
});

emitter.emit('order-pizza', 'large', 'mashroom');