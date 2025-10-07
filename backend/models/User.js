import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },
  role: { type: String, enum: ['Student', 'Admin'], default: 'Student' },
  department: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
