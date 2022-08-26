const Menu = require('../Menu');

const mainMenu = new Menu({
    cars: '\x1B[3;2H',
    test: '\x1B[4;2H',
    test2: '\x1B[5;2H',
    exit: '\x1B[6;2H',
}, `
┌─────────────┐
│    cars     │
│    test     │
│    test2    │
│    exit     │
└─────────────┘
`);

module.exports = mainMenu;
