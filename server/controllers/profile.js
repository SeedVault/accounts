const ValidationError = require('mongoose/lib/error/validation');
const { UserService, InvalidCredentialsError, PasswordsDontMatchError } = require('../../domain/users/services/UserService');
const fs = require('fs');
const {resolve} = require("path");

const profile = {

  // GET - /api/profile
  view: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const user = await UserService.findUserById(req.user.id);
      const data = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        countryCode: user.countryCode,
        role: user.role,
        pictureUrl: user.pictureUrl,
      }
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  // POST - /api/profile
  update: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const user = await UserService.findUserById(req.user.id);
      user.firstname = req.body.firstname || '';
      user.lastname = req.body.lastname || '';
      user.email = req.body.email || '';
      user.countryCode = req.body.countryCode || '';
      user.role = req.body.role || '';
      const data = await UserService.updateUser(req.user.username, user);
      let passportUser = JSON.parse(req.session.passport.user);
      passportUser.email = user.email;
      req.session.passport.user = JSON.stringify(passportUser);
      req.session.save();
      res.json('ok');
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },


  // POST - /api/profile/change-password
  changePassword: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const password = req.body.password || '';
      const newPassword = req.body.newPassword || '';
      const repeatNewPassword = req.body.repeatNewPassword || '';
      await UserService.changePassword(req.user.email, password, newPassword, repeatNewPassword);
      res.json('ok');
    } catch (err) {
      console.log(err);
      if (err instanceof InvalidCredentialsError) {
        if (err.errors._) {
          err.errors.password = err.errors._;
          err.errors._.message = 'profile.wrong_password';
          err.errors._.path = 'password';
          delete(err.errors._);
        }
      }
      if (err instanceof PasswordsDontMatchError) {
        if (err.errors._) {
          err.errors.newPassword = err.errors._;
          err.errors._.message = 'domain.user.validation.passwords_dont_match';
          err.errors._.path = 'newPassword';
          delete(err.errors._);
        }
      }

      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },

  // POST - /profile/change-picture
  changePicture: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const user = await UserService.findUserById(req.user.id);
      const oldFile = resolve(`${__dirname}/../../public/uploads/${user.picture}`);
      if (user.picture !== '') {
        if (fs.existsSync(oldFile)) {
          fs.unlink(oldFile, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
        }
      }
      user.picture = req.file.filename;
      const data = await UserService.updateUser(req.user.username, user);
      let passportUser = JSON.parse(req.session.passport.user);
      passportUser.picture = data.pictureUrl;
      req.session.passport.user = JSON.stringify(passportUser);
      req.session.save();
      res.status(200).json(data.pictureUrl);
    } catch (err) {
      next(err);
    }
  },

}

module.exports = profile;
