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
        enum:['pos','kiosk','signage'],
        required:true,
    },
    locationName:{
        type:String,
        required:true,
    },
    // image:{
    //     type:String,
    //     required:true,
    // },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active',
    },
});

module.exports = model("Device",deviceSchema);