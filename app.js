const readline = require('readline');
const createNewCarForm =require('./Forms/CreatNewCar');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
}

async function start() {
    const formResult = await createNewCarForm.startFormAction();
    console.log(formResult)
}

start();
