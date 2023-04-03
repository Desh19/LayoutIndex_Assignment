const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const Joi = require('joi');


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
        // default:[],
    },

});


const Location= mongoose.model("Location",locationSchema);

const validateLocation = (data)=>{
    const schema = Joi.object({

        name:Joi.string()
        .required()
        .label('Location Name'),

        address:Joi.string()
        .required()
        .label('Address'),

        phone:Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required().
        label('Phone Number'),
        
        
    })
    return schema.validate(data);
}

module.exports = {Location,validateLocation};