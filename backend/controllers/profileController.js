import Profile from '../models/ProfileModel.js';
import User from '../models/UserModel.js';

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id }).populate('userId', 'name email role');
    if (!profile) {
      return res.json({
        userId: req.params.id,
        skills: [],
        education: '',
        experienceLevel: 'Beginner',
        careerGoal: '',
        projects: [],
        certifications: []
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfileById = async (req, res) => {
  try {
    const { skills, education, experienceLevel, careerGoal, projects, certifications } = req.body;
    
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      { skills, education, experienceLevel, careerGoal, projects, certifications },
      { returnDocument: 'after', new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfileById = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User and Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const studentProfiles = await Profile.find().populate({
      path: 'userId',
      select: 'name email role',
      match: { role: 'Student' }
    });

    const filtered = studentProfiles.filter(p => p.userId !== null);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};