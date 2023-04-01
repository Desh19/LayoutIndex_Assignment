const Location = require('../models/location');

const locationController={
    
    //add location to the database
    addLocation: async (req,res)=>{
        try{
            const {name, address, phone, devices, locationID} = req.body;
            // Check if location already exists
            const existingName = await Location.findOne({name:name});
            if(existingName)
                return res.status(400).json({
                    msg:"Location already exists",
                });
            const newLoaction = new Location({
                name, address, phone, devices
            });
            await newLoaction.save();

            res.json({
                msg:"Location added successfully",
                data: newLoaction,
            });

        }catch(err){
            return res.status(500).json({msg:err.message});
        }
    },

    //get all locations
    getAllLocation: async (req,res)=>{
        try{
            const locations = await Location.find();
            res.json({
                msg:"All locations",
                data: locations,
            }); 
        }catch(err){
            return res.status(500).json({msg:err.message});
        }
    },

    //get location by id
    getLocationById: async (req,res)=>{
        const id = req.params.id;
        try{
            const location = await Location.findOne({ _id: id});
            res.json({
                msg:"Find Location",
                data: location,
            })
        }catch(err){
            return res.status(500).json({msg:err.message});
        }
    },


    //update location details
    updateLocation: async (req,res)=>{
        
        try{
            const id = req.params.id;
            const {name, address, phone, devices} = req.body;
            
            await Location.findOneAndUpdate(
                {_id:id},
                {name, address, phone, devices}
            );

            res.json({
                msg:"Location updated successfully",
            });           
                 
        } catch(err){
            return res.status(500).json({msg:err.message});
        }
    },

};

module.exports = locationController;