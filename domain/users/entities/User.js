var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Bcrypt = require('bcryptjs');

const AccountStatus = {
  UNVERIFIED: 0,
  VERIFIED: 1,
  DISABLED: 2,
}

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'validation.required'],
    match: [/^[a-zA-Z0-9]+$/, 'validation.regex'],
    index: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'validation.required'],
    match: [/\S+@\S+\.\S+/, 'validation.email'],
    unique: true,
    index: true,
    trim: true
  },
  firstname: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
  countryCode: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  wallet: {
    type: String,
    required: [true, 'validation.required'],
    trim: true,
    default: '12345',
  },
  password: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
  verificationCode: {
    type: String,
    trim: true,
    default: ''
  },
  accountStatus: { // 0: Unverified: 1: Account verified, 2: Account disabled
    type: Number,
    min: [AccountStatus.UNVERIFIED, 'validation.option'],
    max: [AccountStatus.DISABLED, 'validation.option'],
    required: [true, 'validation.required'],
    default: AccountStatus.UNVERIFIED,
  },
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, { message: 'domain.user.validation.unique_{PATH}' });

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(plaintextPassword) {
  return await Bcrypt.compareSync(plaintextPassword, this.password);
};

UserSchema.pre('save', function(next) {
  if (!this.isModified('verificationCode')) {
    return next();
  }
  this.verificationCode = Bcrypt.hashSync(this.verificationCode, 10);
  next();
});

UserSchema.methods.compareVerificationCode = async function(plaintextVerificationCode) {
  return await Bcrypt.compareSync(plaintextVerificationCode, this.verificationCode);
};

module.exports = {
  AccountStatus,
  User: mongoose.model('Users', UserSchema)
}
