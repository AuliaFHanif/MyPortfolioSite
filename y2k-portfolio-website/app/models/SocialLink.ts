import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.SocialLink || mongoose.model('SocialLink', SocialLinkSchema);