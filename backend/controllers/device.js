const Device = require('../models/device');
const Location = require('../models/location');

const deviceController={

    //Add device to the database
    addDevice: async (req, res)=>{
        try{
            console.log(req.body)
            const {serialNo, type, locationName, image, locationId } = req.body;
            //check if the serial number is already in the database
            const existingDevice = await Device.findOne({serialNo:serialNo});
            const existingLocation = await Location.findOne({name:locationName});
            if(existingDevice)
                    return res.status(400).json({
                    msg:"Device already exists",
            });
            if(!existingLocation)
                    return res.status(400).json({
                    msg:"Location does not exist",
            });

            const newDevice = new Device({

                serialNo, 
                type, 
                locationName, 
                image:image, 
                
            });

            await newDevice.save();

            if(res){
                res.json({
                    msg:"Device added successfully",
                    data: newDevice,
                });

                await Location.updateOne(
                    {_id:locationId},
                    {$push:{devices:type}}
                );
            }

        } catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    //get all devices
    getAllDevices : async (req,res)=>{
        try{
            const devices = await Device.find();
            res.json({
                msg:"All devices",
                data: devices,
            });
        } catch(err){
            return res.status(500).json({message:err.message}); 
        }
    },

    //get device by id
    getDeviceById : async (req,res)=>{
        const id = req.params.id;
        try{
            const device = await Device.findOne({_id:id});
            res.json({
                msg:"Device found",
                data: device,
            });
        }catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    //update device
    updateDevice : async (req,res)=>{
        try{
            console.log(req.body)
            const id = req.params.id;
            const {serialNo, type, locationName, image, status} = req.body;

            console.log(type, locationName, image, status)
            await Device.findByIdAndUpdate(
                {_id:id},
                { type, locationName, image, status},
            );

            res.json({
                msg:"Device updated successfully",
                data: {serialNo, type, locationName, image, status},
            });


        } catch(err){
            return res.status(500).json({message:err.message});
        }
    },

    //delete device
    deleteDevice : async (req,res)=>{
        try{
            const id = req.params.id;

            const device = await Device.findOne({_id:id});
            const existingLocation = await Location.findOne({
                name:device.locationName,
            });
            await Location.updateOne(
                {_id: existingLocation._id},
                {$pull:{devices:device.type}}
            );
            await Device.findOneAndDelete({_id:id});
            if(res){
                res.json({
                    msg:"Device deleted successfully",
                });
                await Location.updateOne(
                    {_id:existingLocation._id},
                    {$pull:{devices:device.type}}
                );
            }

        }catch(err){
            return res.status(500).json({message:err.message});
        }
    },


        //get device by LocationName
        getDeviceByLocationName : async (req,res)=>{
            const locationName = req.params.locationName;          
            try{
                const devices = await Device.find({locationName:locationName});
                res.json({
                    msg:"Devices found",
                    data: devices,
                });
            }catch(err){
                return res.status(500).json({message:err.message});
            }
        },


};

module.exports = deviceController;