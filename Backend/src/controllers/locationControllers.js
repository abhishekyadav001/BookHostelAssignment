const Hostel = require("../models/Hostel");
const Location = require("../models/Location");

// GET all locations with hostel count
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    const locationsWithCount = await Promise.all(
      locations.map(async (location) => {
        const count = await Hostel.countDocuments({ locationId: location._id });
        return { ...location.toObject(), hostelCount: count };
      })
    );

    res.status(200).json(locationsWithCount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
