const Form = require("../Form");

const newMan = new Form({
    name: '\x1B[3;9H',
    age: '\x1B[5;9H',
    gender: '\x1B[7;9H'
},`
┌───────────────────────────────┐
│  name:                        │
├───────────────────────────────┤
│   age:                        │
├───────────────────────────────┤
│gender:                        │
└───────────────────────────────┘
`);

module.exports = newMan;
