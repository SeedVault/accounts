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
}

module.exports = api;
