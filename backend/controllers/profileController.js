import Profile from '../models/ProfileModel.js';
import User from '../models/UserModel.js';

// Get Profile by User ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id }).populate('userId', 'name email role');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile by User ID
export const updateProfileById = async (req, res) => {
  try {
    const { skills, education, experienceLevel, careerGoal, projects, certifications } = req.body;
    
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      { skills, education, experienceLevel, careerGoal, projects, certifications },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Profile & Account by User ID
export const deleteProfileById = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User and Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Students
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