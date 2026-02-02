import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  credentialId: {
    type: String,
  },
  credentialUrl: {
    type: String,
  },
  icon: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);