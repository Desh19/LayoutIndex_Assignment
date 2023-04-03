const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const Joi = require('joi');

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


const Device = mongoose.model("Device",deviceSchema);

const validateDevice = (data)=>{
    const schema = Joi.object({

        serialNo:Joi.string()
        .required()
        .label('Serial Number'),

        type:Joi.string()
        .required()
        .label('Device Type'),

        locationName:Joi.string()
        .required()
        .label('Location'),

        image:Joi.string()
        .required()
        .label('Image'),
        
        
    })
    return schema.validate(data);
}

const validateUpdateDevice = (data)=>{
    const schema = Joi.object({

        serialNo:Joi.string()
        .required(),

        type:Joi.string()
        .required(),

        locationName:Joi.string()
        .required(),

        image:Joi.string()
        .required(),
        
        status:Joi.string()
        .required(),
        
    })
    return schema.validate(data);
}

module.exports = {Device,validateDevice,validateUpdateDevice};