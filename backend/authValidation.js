const Joi = require('joi');
const validationRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .required()
      .messages({
        'string.min': 'Tên đăng nhập phải có ít nhất 3 kí tự',
        'string.empty': 'Tên đăng nhập không được để trống',
        'string.max': 'Tên đăng nhập tối đa 30 kí tự',
        'any.required': 'Vui lòng nhập tên đăng nhập'
      }),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .messages({
        'string.min': 'Mật khẩu phải có ít nhất 6 kí tự!',
        'string.empty': 'Mật khẩu không được để trống!',
        'string.max': 'Mật khẩu tối đa 20 kí tự!',
        'any.required': 'Vui lòng nhập mật khẩu!'
      }),
    email: Joi.string()
      .required()
      .email({
        maxDomainSegments: 2,
        tlds: { allow: false }
      })
      .messages({
        'string.email': 'Email không đúng định dạng',
        'any.required': 'Vui lòng nhập email'
      })
  })
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    const errorDetails = error.details.map(err => err.message);
    return res.status(400).json({ message: errorDetails });
  }
  next();
}
const validationLogin = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .required()
      .messages({
        'string.min': 'Tên đăng nhập phải có ít nhất 3 kí tự',
        'string.empty': 'Tên đăng nhập không được để trống',
        'string.max': 'Tên đăng nhập tối đa 30 kí tự',
        'any.required': 'Vui lòng nhập tên đăng nhập'
      }),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .messages({
        'string.min': 'Mật khẩu phải có ít nhất 6 kí tự!',
        'string.empty': 'Mật khẩu không được để trống!',
        'string.max': 'Mật khẩu tối đa 20 kí tự!',
        'any.required': 'Vui lòng nhập mật khẩu!'
      }),
  })
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    const errorDetails = error.details.map(err => err.message);
    return res.status(400).json({ message: errorDetails });
  }
  next();
}
module.exports = { validationRegister, validationLogin };