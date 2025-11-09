import mongoose from 'mongoose';

const LearningResourcesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    section: { type: String, required: true },
    subsection: { type: String, required: true },
    // Embedded PDF data (no GridFS)
    data: { type: Buffer, required: true },
    fileName: { type: String },
    size: { type: Number },
    contentType: { type: String, default: 'application/pdf' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    collection: 'learning_resources'
  }
);

export default mongoose.model('Learning_Resources', LearningResourcesSchema);
