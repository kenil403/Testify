import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    explanation: { type: String },
  },
  { _id: false }
);

const learningPaperSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // e.g., 'Aptitude'
    paperId: { type: String, required: true }, // e.g., 'paper1'..'paper5'
    name: { type: String, required: true },
    duration: { type: Number, required: true }, // minutes
    totalQuestions: { type: Number, required: true },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true, collection: 'learning_papers' }
);

learningPaperSchema.index({ category: 1, paperId: 1 }, { unique: true });

const LearningPaper = mongoose.model('Learning_Paper', learningPaperSchema);
export default LearningPaper;
