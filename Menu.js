class Menu {

    menu;
    fieldsPositions;
    currentField;

    constructor(fieldsPositions, menu) {
        this.menu = menu;
        this.fieldsPositions = fieldsPositions;

        this.fieldsKeys = Object.keys(fieldsPositions);
        this.currentField = this.fieldsKeys[0];
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

    /**
     * Основной метод, запускающий выполнение формы
     */
    async startMenuAction() {
        return new Promise((resolve) => {

            console.clear();
            process.stdout.write(this.menu);
            process.stdout.write(this.fieldsPositions[this.currentField]);

            process.stdin.on('keypress', (chunk, key) => {

                switch (key.sequence) {

                    case '\x1B[B':
                        this.next();
                        break;

                    case '\x1B[A':
                        this.previous();
                        break;

                    case '\x7F':

                        break;

                    case '\r':

                        break;

                    case '\x03':
                        process.exit();
                        break;

                    default:

                }
            });
        })

    }
}

module.exports = Menu;
