var mongoose = require('mongoose');

const PasswordResetCodeSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'validation.required'],
    match: [/\S+@\S+\.\S+/, 'validation.email'],
    trim: true
  },
  verificationCode: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
  newPassword: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
  repeatNewPassword: {
    type: String,
    required: [true, 'validation.required'],
    trim: true
  },
});

PasswordResetCodeSchema.statics.check = function(credentials) {
	return new Promise((res, rej) => {
		const pObj = new this(credentials);
		pObj.validate(err => {
			if (err) {
				return rej(err);
			} else
				return res('success');
		});
	});
}

module.exports = mongoose.model('PasswordResetCode', PasswordResetCodeSchema);
