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
    uniqueCaseInsensitive: true,
    trim: true
  },
  normalizedUsername: {
    type: String,
    lowercase: true,
    required: [true, 'validation.required'],
    match: [/^[a-z0-9]+$/, 'validation.regex'],
    index: true,
    unique: true,
    uniqueCaseInsensitive: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'validation.required'],
    match: [/\S+@\S+\.\S+/, 'validation.email'],
    unique: true,
    uniqueCaseInsensitive: true,
    index: true,
    trim: true
  },
  normalizedEmail: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'validation.email'],
    unique: true,
    uniqueCaseInsensitive: true,
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
    lowercase: true,
    required: [true, 'validation.required'],
    enum: {
      values: [
        'af', 'al', 'dz', 'ad', 'ao', 'ag', 'ar', 'am', 'au', 'at', 'az', 'bs',
        'bh', 'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bt', 'bo', 'ba', 'bw', 'br',
        'bn', 'bg', 'bf', 'bi', 'cv', 'kh', 'cm', 'ca', 'cf', 'td', 'cl', 'cn',
        'co', 'km', 'cg', 'cd', 'cr', 'ci', 'hr', 'cu', 'cy', 'cz', 'dk', 'dj',
        'dm', 'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'sz', 'et', 'fj', 'fi',
        'fr', 'ga', 'gm', 'ge', 'de', 'gh', 'gr', 'gd', 'gt', 'gn', 'gw', 'gy',
        'ht', 'hn', 'hu', 'is', 'in', 'id', 'ir', 'iq', 'ie', 'il', 'it', 'jm',
        'jp', 'jo', 'kz', 'ke', 'ki', 'kp', 'kr', 'kw', 'kg', 'la', 'lv', 'lb',
        'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mg', 'mw', 'my', 'mv', 'ml', 'mt',
        'mh', 'mr', 'mu', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ma', 'mz', 'mm',
        'na', 'nr', 'np', 'nl', 'nz', 'ni', 'ne', 'ng', 'mk', 'no', 'om', 'pk',
        'pw', 'pa', 'pg', 'py', 'pe', 'ph', 'pl', 'pt', 'qa', 'ro', 'ru', 'rw',
        'kn', 'lc', 'vc', 'ws', 'sm', 'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg',
        'sk', 'si', 'sb', 'so', 'za', 'ss', 'es', 'lk', 'sd', 'sr', 'se', 'ch',
        'sy', 'tj', 'tz', 'th', 'tl', 'tg', 'to', 'tt', 'tn', 'tr', 'tm', 'tv',
        'ug', 'ua', 'ae', 'gb', 'us', 'uy', 'uz', 'vu', 've', 'vn', 'ye', 'zm',
        'zw',
      ],
      message: 'validation.option',
    },
    trim: true
  },
  role: {
    type: String,
    required: [true, 'validation.required'],
    enum:  {
      values: ['user', 'developer', 'publisher'],
      message: 'validation.option'
    },
    trim: true,
    index: true,
  },
  picture: {
    type: String,
    trim: true,
    default: '',
  },
  walletAddress: {
    type: String,
    required: [true, 'validation.required'],
    trim: true,
    default: '',
    unique: true,
    uniqueCaseInsensitive: true,
    index: true,
  },
  normalizedWalletAddress: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
    unique: true,
    uniqueCaseInsensitive: true,
    index: true,
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

UserSchema.set('toJSON', { getters: true, virtuals: true });
UserSchema.set('toObject', { getters: true, virtuals: true });

UserSchema.plugin(uniqueValidator, { message: 'domain.user.validation.unique_{PATH}' });

UserSchema.virtual('pictureUrl').get(function () {
  if (this.picture === '') {
    return `${process.env.ACCOUNTS_URL}/images/user-default.png`;
  } else {
    return `${process.env.ACCOUNTS_URL}/uploads/${this.picture}`;
  }
});

UserSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = Bcrypt.hashSync(this.password, 10);
  }
  if (this.isModified('verificationCode')) {
    this.verificationCode = Bcrypt.hashSync(this.verificationCode, 10);
  }
  if (this.isModified('username')) {
    this.normalizedUsername = this.username.toLowerCase();
  }
  if (this.isModified('email')) {
    this.normalizedEmail = this.email.toLowerCase();
  }
  if (this.isModified('walletAddress')) {
    this.normalizedWalletAddress = this.walletAddress.toLowerCase();
  }
  next();
});

UserSchema.methods.comparePassword = async function(plaintextPassword) {
  return await Bcrypt.compareSync(plaintextPassword, this.password);
};

UserSchema.methods.compareVerificationCode = async function(plaintextVerificationCode) {
  return await Bcrypt.compareSync(plaintextVerificationCode, this.verificationCode);
};

module.exports = {
  AccountStatus,
  User: mongoose.model('Users', UserSchema)
}
