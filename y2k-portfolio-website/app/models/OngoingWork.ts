import mongoose from 'mongoose';

const OngoingWorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Planning', 'Designing', 'Coding', 'Testing', 'Polishing'],
      default: 'Coding',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.OngoingWork || mongoose.model('OngoingWork', OngoingWorkSchema);
