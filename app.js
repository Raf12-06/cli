const readline = require('readline');

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

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
}

class FormMove {

    currentField;
    fieldsPositions;
    fieldsKeys;
    result = {};

    constructor(fieldsPositions) {
        this.fieldsPositions = fieldsPositions;
        this.fieldsKeys = Object.keys(fieldsPositions);
        this.currentField = this.fieldsKeys[0];

        this.fieldsKeys.forEach((key) => {
            this.result[key] = '';
        })

        process.stdout.write(this.fieldsPositions[this.currentField]);
    }

    next() {
        const key = this.currentField;
        const indexKey = this.fieldsKeys.indexOf(key);
        if (indexKey < this.fieldsKeys.length - 1) {
            this.currentField = this.fieldsKeys[indexKey + 1]
        } else {
            this.currentField = this.fieldsKeys[0];
        }

        process.stdout.write(this.fieldsPositions[this.currentField]);
    }

    previous() {
        const key = this.currentField;
        const indexKey = this.fieldsKeys.indexOf(key);
        if (indexKey > 0) {
            this.currentField = this.fieldsKeys[indexKey - 1]
        }

        process.stdout.write(this.fieldsPositions[this.currentField]);
    }

    saveFieldEntry(key) {
        const field = this.currentField;
        this.result[field] += key;
    }

    getResult() {
        console.log(this.result);
    }
}

const formMover = new FormMove({
    mark: '\x1B[3;9H',
    model: '\x1B[5;9H',
    color: '\x1B[7;9H',
    horse_power: '\x1B[3;50H'
});

process.stdin.on('keypress', (chunk, key) => {

    process.stdout.write(key.sequence);

    switch (key.sequence) {
        case '\x1B[B':
            formMover.next();
            break;
        case '\x1B[A':
            formMover.previous();
            break;
        case '\r':
            formMover.next();
            break;
        case '\x03':
            process.exit();
            break;
        case 'q':
            console.clear();
            formMover.getResult();
            break;
        default:
            formMover.saveFieldEntry(key.sequence);
    }
});
