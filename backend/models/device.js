const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const deviceSchema = new Schema({
    serialNo:{
        type:String,
        required:true,
        unique:true,
    },
    type:{
        type:String,
        required:true,
    },
    locationName:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'Active',
    },
});

module.exports = model("Device",deviceSchema);