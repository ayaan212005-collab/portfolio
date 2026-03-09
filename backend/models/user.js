const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    title: String,
    bio: String,
    location: String,
    phone: String,
    linkedin: String,
    github: String
  },
  education: [{
    institution: String,
    degree: String,
    cgpa: String,
    year: String
  }],
  experience: [{
    company: String,
    role: String,
    description: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  skills: [{
    name: String,
    level: { type: Number, min: 0, max: 100 },
    category: String
  }],
  achievements: [String]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);