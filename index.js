const PizzaShop = require('./pizzaShop');

const pizzaShop = new PizzaShop();

pizzaShop.on('order', (size, topping) => {
    console.log(`${size} ${topping} pizza has been ordered!`);
});

pizzaShop.order('large', 'mashrooms');
pizzaShop.displayOrder();



// const God = require('./god');

// const ram = new God('Ram');
// console.log(ram.getName());
// console.log(ram.getName());