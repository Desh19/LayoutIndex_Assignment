const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const locationSchema = new Schema({ 
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    devices:{
        type:Array,
        default:[],
    },

});

module.exports = model("Location",locationSchema);