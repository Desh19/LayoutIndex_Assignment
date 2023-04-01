const express =  require("express");
const locationRouter = express.Router();
const locationController = require("../controllers/location");


//create location
locationRouter.post("/add", locationController.addLocation);

//get all locations
locationRouter.get("/locations", locationController.getAllLocation);

//get location by id
locationRouter.get("/location/:id", locationController.getLocationById);

//update location
locationRouter.put("/update/:id", locationController.updateLocation);

module.exports = locationRouter;