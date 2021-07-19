const { randomUUID } = require("crypto");

const project_structure = {
    _id: ObjectId('60f479a27ce228cba09db640'),
    resources: [
        {
            id: randomUUID(),
            filename: "",
            type: "sound|image"
        }
    ],
    __v: 0
};