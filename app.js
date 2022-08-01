const readline = require('readline');
const FormMover = require('./Form');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
}

console.clear();

console.log(`
┌───────────────────────────────┐  ┌───────────────────────────────┐
│  mark:                        │  │ horse power:                  │
├───────────────────────────────┤  └───────────────────────────────┘
│ model:                        │
├───────────────────────────────┤
│ color:                        │
└───────────────────────────────┘
`);

const creatNewCarForm = new FormMover({
    mark: '\x1B[3;9H',
    model: '\x1B[5;9H',
    color: '\x1B[7;9H',
    horse_power: '\x1B[3;50H'
});

creatNewCarForm.startFormAction();
