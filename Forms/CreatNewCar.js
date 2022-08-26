const Form = require("../Form");

const creatNewCarForm = new Form({
    mark: '\x1B[3;37H',
    model: '\x1B[5;37H',
    color: '\x1B[7;37H',
    horse_power: '\x1B[3;78H'
},`
                            ┌───────────────────────────────┐  ┌─────────────────────────────────────┐
                            │  mark:                        │  │ horse power:                        │
                            ├───────────────────────────────┤  └─────────────────────────────────────┘
                            │ model:                        │
                            ├───────────────────────────────┤
                            │ color:                        │
                            └───────────────────────────────┘
`);

module.exports = creatNewCarForm;
