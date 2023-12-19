import mongoose from 'mongoose';
import User from './user.js';

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name:{type: String},
  photo: {type: String},
  bio: {type: String},
  DOB: {type: Date},
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] 
});

export default mongoose.model('Profile', ProfileSchema);
