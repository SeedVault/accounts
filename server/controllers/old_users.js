const {check, validationResult} = require('express-validator');

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    err = {};
    err.name = ['Required'];
    console.warn(err);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: err });
    }
     /* if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     } */
     /*const { userName, email, phone, status } = req.body
     const user = await User.create({
       userName,
       email,
       phone,
       status,
     })
     res.json(user) */
     res.json({});
  } catch(err) {
    return next(err)
  }
}

