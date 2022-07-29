const readline = require('readline');

console.clear();
console.log(`
┌───────────────────────────────┐
│  first:                       │
├───────────────────────────────┤
│ second:                       │
├───────────────────────────────┤
│  third:                       │
└───────────────────────────────┘
`)
process.stdout.write('\x1B[3;15H');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class FormMove {

    first = '\x1B[';
    second = '\x1B[';
    third = '\x1B[';

    static next() {
        process.stdout.write('\x1B[3;4H')
    }

    static previous() {
        process.stdout.write('\x1B[5;20H')
    }
}

process.stdin.on('keypress', (chunk, key) => {
        switch (key.sequence) {
            case '\x1B[A':
                FormMove.next();
                break;
            case '\x1B[B':
                FormMove.previous();
                break;
            case '\x7F':
                break;
            case '\x03':
                process.exit();
                break;
        }
});
