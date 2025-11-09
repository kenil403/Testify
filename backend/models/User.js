import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },
  role: { type: String, enum: ['Student', 'Admin'], default: 'Student' },
  department: { type: String },
  testHistory: [
    {
      category: String,
      // The paper id for this attempt, e.g., 'paper1'
      paperId: String,
      score: Number,
      date: { type: Date, default: Date.now },
      // Duration spent on the test in minutes
      timeSpent: Number,
      // Total questions in the test to support analytics like accuracy
      totalQuestions: Number
    }
  ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
