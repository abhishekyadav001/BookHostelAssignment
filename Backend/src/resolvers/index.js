// src/resolvers/index.js
const Location = require("../models/Location.js");
const Hostel = require("../models/Hostel.js");

const resolvers = {
  Query: {
    locations: async () => await Location.find(),
    location: async (_, { id }) => await Location.findById(id),
    hostelsByLocation: async (_, { locationId }) => await Hostel.find({ locationId }),
  },
  Mutation: {
    addLocation: async (_, { name, image }) => {
      const location = new Location({ name, image });
      return await location.save();
    },
    addHostel: async (_, { name, image, locationId }) => {
      const hostel = new Hostel({ name, image, locationId });
      return await hostel.save();
    },
  },
  Location: {
    hostels: async (parent) => await Hostel.find({ locationId: parent.id }),
    hostelCount: async (parent) => await Hostel.countDocuments({ locationId: parent.id }),
  },
};

module.exports = resolvers;
