const { check } = require('express-validator/check');

exports.validate = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('email').exists().isEmail().withMessage('Must be a valid e-mail').not().isEmpty().withMessage('Required').isLength({ min: 10 }).withMessage('Al menos 10 letras'),
        check('password').exists().not().isEmpty().withMessage('Required'),
        check('remember').exists().not().isEmpty().isIn(['1', '0'])
      ]
    }
  }
}
