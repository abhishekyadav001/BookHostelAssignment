import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

// Use a named export or default export explicitly
const Location = mongoose.models.Location || mongoose.model('Location', LocationSchema);
export default Location;