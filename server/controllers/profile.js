const ValidationError = require('mongoose/lib/error/validation');
const { UserService , UserNotFoundError } = require('../../domain/users/services/UserService');
const fs = require('fs');
const {resolve} = require("path");

const profile = {

  // GET - /api/profile
  view: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const data = await UserService.findUserById(req.user.id);
      res.json(data);
    } catch (err) {
      next(err);
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
      res.status(200).json(data.pictureUrl);
    } catch (err) {
      next(err);
    }
  },

}

module.exports = profile;
