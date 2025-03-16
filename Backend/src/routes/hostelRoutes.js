const express = require("express");
const { getHostelsByLocation } = require("../controllers/hostelControllers");

const hostelRoutes = express.Router();

// GET hostels by location ID
hostelRoutes.get("/:locationId", getHostelsByLocation);

module.exports = hostelRoutes;
