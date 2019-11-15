const { UserService } = require('../../domain/users/services/UserService');

const api = {

  // GET - /api/profiles/search
  searchProfiles: async (req, res, next) => {
    try {
      const results = await UserService.searchProfiles(req.query.q);
      if (Object.keys(results).length === 0) {
        res.json('[]');
      } else {
        // serialize array with keys into array of json objects
        let data = [];
        for (let keyword in results) {
          if (results.hasOwnProperty(keyword)) {
            data.push({
              keyword: keyword,
              profile: results[keyword],
            });
          }
        }
        res.json(data);
      }
    } catch (err) {
      next(err);
    }
  },

  // GET - /api/referral-codes/report
  getReferralCodesReport: async (req, res, next) => {
    try {
      const results = await UserService.referralCodeReport();
      let data = [];
      for (let i = 0; i < results.length; i += 1) {
        data.push({
          username: results[i].username,
          firstname: results[i].firstname,
          lastname: results[i].lastname,
          email: results[i].email,
          referralCode: results[i].referralCode,
          createdAt: results[i].createdAt
        });
      }
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
}

module.exports = api;
