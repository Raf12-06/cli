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

class FormMove {

    first = '\x1B[';
    second = '\x1B[';
    third = '\x1B[';

    static next(currentPos) {
        process.stdout.write('\x1B[' + 3 + ';' + 4 + 'H')
    }

    static previous(currentPos) {
        process.stdout.write('\x1B[' + 3 + ';' + 4 + 'H')
    }
}

process.stdin.on('keypress', (chunk, key) => {

        switch (key.sequence) {
            case '\x1B[A':
                FormMove.next(3);
                break;
            case '\x1B[B':
                FormMove.previous(4);
                break;
            case 'x7F':
                break;
            case '\x03':
                process.exit();
                break;
            case '\r':
                break;
        }
});
