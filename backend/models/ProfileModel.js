import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: String }],
  education: { type: String, default: '' },
  experienceLevel: { type: String, default: 'Beginner' },
  careerGoal: { type: String, default: '' },
  projects: [{
    title: String,
    description: String,
    link: String
  }],
  certifications: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);