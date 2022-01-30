const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const InstituteSchema = new Schema({
    instituteName: {
        type: String,
        required: true,
    },
})

mongoose.model("Institute", InstituteSchema)