const users = {

  // GET - /:locale/users/sign-up
  showSignUpForm: async (req, res, next) => {
    try {
      res.send('sign up form');
    } catch (err) {
      next(err);
    }
  },

}

module.exports = users;
