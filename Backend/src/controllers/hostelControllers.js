const Hostel = require("../models/Hostel");

// GET hostels by location ID
export const getHostelsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const hostels = await Hostel.find({ locationId });

    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getHostelsByLocation;
