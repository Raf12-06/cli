const readline = require('readline');
const createNewCarForm = require('./Forms/CreatNewCar');
const mainMenu = require('./Menus/Main');
const newMan = require('./Forms/man');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
}

async function start() {
    // const formResult = await createNewCarForm.startFormAction();
    const formResult = await newMan.startFormAction();
}

start();
