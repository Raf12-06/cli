/**
 * Конструктор формы
 * - навигаяция по форме
 * - получение результата заполненной формы
 */
class Form {

    form;
    currentField;
    fieldsPositions;
    fieldsKeys;
    result = {};

    constructor(fieldsPositions, form) {
        this.form = form;

        this.fieldsPositions = fieldsPositions;
        this.fieldsKeys = Object.keys(fieldsPositions);
        this.currentField = this.fieldsKeys[0];

        this.fieldsKeys.forEach((key) => {
            this.result[key] = '';
        })
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

    eraseField() {
        const field = this.currentField;
        this.result[field] = '              ';
    }

    getResult() {
        process.stdin.removeAllListeners();
        console.clear();
        for (const value in this.result) {
            const str = this.result[value];
            this.result[value] = str.trim();
        }

        return this.result;
    }

    renderFieldBackGroundColor() {
        for (let i = 0; i < this.fieldsKeys.length; i++) {
            const field = this.fieldsKeys[i];
            process.stdout.write(this.fieldsPositions[field]);
            process.stdout.write('\x1B[0;30;47m                      ')
        }
    }

    renderFormBackGroundColor() {

    }

    async startFormAction() {
        return new Promise((resolve) => {

            console.clear();
            process.stdout.write(this.form);
            this.renderFieldBackGroundColor();
            process.stdout.write(this.fieldsPositions[this.currentField]);

            process.stdin.on('keypress', (chunk, key) => {
                process.stdout.write('\x1B[3;34m' + key.sequence);

                switch (key.sequence) {

                    case '\x1B[B':
                        this.next();
                        break;

                    case '\x1B[A':
                        this.previous();
                        break;

                    case '\x7F':
                        this.eraseField();
                        const field = this.currentField;

                        process.stdout.write(this.fieldsPositions[field]);
                        process.stdout.write(this.result[field]);
                        process.stdout.write(this.fieldsPositions[field]);
                        break;

                    case '\r':
                        for (const value in this.result) {
                            if (!this.result[value]) {
                                return this.next();
                            }
                        }
                        process.stdout.write('\x1b[0m');
                        resolve(this.getResult());
                        break;

                    case '\x03':
                        process.exit();
                        break;

                    default:
                        this.saveFieldEntry(key.sequence);
                }
            });
        })

    }
}

module.exports = Form;
