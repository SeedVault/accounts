var mongoose = require('mongoose');

const VerificationCredentialsSchema = mongoose.Schema({
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
});

VerificationCredentialsSchema.statics.check = function(credentials) {
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

module.exports = mongoose.model('VerificationCredentials', VerificationCredentialsSchema);
