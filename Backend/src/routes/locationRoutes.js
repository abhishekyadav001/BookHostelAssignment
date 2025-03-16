const express = require("express");
const { getAllLocations } = require("../controllers/hostelControllers");

const locationRoutes = express.Router();

// GET all locations with hostel count
locationRoutes.get("/", getAllLocations);

module.exports = locationRoutes;
