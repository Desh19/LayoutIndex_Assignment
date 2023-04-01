const express = require('express');
const deviceRouter = express.Router();
const deviceController = require('../controllers/device');


//add device
deviceRouter.post("/add", deviceController.addDevice);

//get all devices
deviceRouter.get("/devices", deviceController.getAllDevices);

//get device by id
deviceRouter.get("/device/:id", deviceController.getDeviceById);

//update device
deviceRouter.put("/update/:id", deviceController.updateDevice);

//delete device
deviceRouter.delete("/delete/:id", deviceController.deleteDevice);



module.exports = deviceRouter;