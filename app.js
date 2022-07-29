const readline = require('readline');

console.clear();

// console.log(`
// ┌───────────────────────────────┐
// │  first:                       │
// ├───────────────────────────────┤
// │ second:                       │
// ├───────────────────────────────┤
// │  third:                       │
// └───────────────────────────────┘
// `)
process.stdout.write('\x1B[3;15H');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class FormMove {

    first = '\x1B[';
    second = '\x1B[';
    third = '\x1B[';

    static async next() {
        const pos = await this.getCursorPosition()
        process.stdout.write(pos + '')
        process.stdout.write('\x1B[3;4H')
    }

    static async previous() {
        const pos = await this.getCursorPosition()
        process.stdout.write(pos + '')
        process.stdout.write('\x1B[5;20H')
    }

    static getCursorPosition() {
        return new Promise((resolve) => {
            const parse = () => {
                const buf = process.stdin.read();
                const str = JSON.stringify(buf);
                const regex = /\[(.*)/g;
                const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';');
                resolve({rows: xy[0], cols: xy[1]});
            }

            process.stdin.once('readable', parse);
            process.stdout.write('\x1B[6n');
        })
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
