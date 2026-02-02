import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
    required: true,
  },
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);