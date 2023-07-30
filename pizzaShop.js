const EventEmmiter = require('node:events');

class PizzaShop extends EventEmmiter {
    constructor() {
        super();
        this.orderNumber = 0;
    }

    order(size, topping) {
        this.orderNumber++;
        this.emit('order', size, topping);
    }

    displayOrder() {
        console.log('current order number is ', this.orderNumber);
    }
    
}

module.exports = PizzaShop;
