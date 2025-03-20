const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
});

module.exports = mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);
