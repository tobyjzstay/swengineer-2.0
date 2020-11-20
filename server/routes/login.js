const async = require('async');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const config = require('../config');
const User = require('../models/User');

const router = express.Router();

router.post('/register', function (req, res) {
  const { name, email, emailConfirm, password, passwordConfirm } = req.body;

  let code = 400;
  let response = {
    nameError: '',
    emailError: '',
    emailConfirmError: '',
    passwordError: '',
    passwordConfirmError: '',
  };

  if (!name) {
    response.nameError = 'Invalid name';
  }
  if (!password) {
    response.passwordError = 'Invalid password';
  } else if (!passwordConfirm && password !== passwordConfirm) {
    response.passwordConfirmError = 'Passwords do not match';
  }
  if (!email) {
    response.emailError = 'Invalid email address';
    res.status(code).json(response);
    return;
  } else {
    User.findOne({ email }, function (err, user) {
      if (err) {
        code = 500;
        res.status(code).json(response);
        return;
      } else if (!user) {
        const user = new User({ name, email, password });
        if (!response.nameError && !response.passwordError && !response.passwordConfirmError) {
          user.save(function (err) {
            if (err) {
              code = 500;
            } else if (!emailConfirm && email !== emailConfirm) {
              response.emailConfirmError = 'Email addresses do not match';
            } else {
              code = 200;
            }
            res.status(code).json(response);
            return;
          });
        }
      } else {
        response.emailError = 'An account with that email address already exists';
        res.status(code).json(response);
        return;
      }
    });
  }
});

router.post('/login', function (req, res) {
  const { email, password } = req.body;

  let code = 400;
  let response = {
    emailError: '',
    passwordError: ''
  };

  User.findOne({ email }, function (err, user) {
    if (err) {
      code = 500;
      res.status(code).json(response);
      return;
    } else if (!user) {
      response.emailError = 'Invalid email address';
      res.status(code).json(response);
      return;
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          code = 500;
          res.status(code).json(response);
          return;
        } else if (!same) {
          code = 401
          response.passwordError = 'Invalid password';
          res.status(code).json(response);
          return;
        } else {
          const payload = { userId: user._id };
          const token = jwt.sign(payload, config.secret.key, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

router.post('/logout', function (req, res) {
  res.clearCookie('token', { path: '/' }).sendStatus(200);
});

router.post('/reset', function (req, res, next) {
  const { email } = req.body;
  const host = req.headers.referer;

  let code = 400;
  let response = {
    emailError: ''
  };

  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: email }, function (err, user) {
        if (!user) {
          response.emailError = 'Could not find that email address';
          res.status(code).json(response);
          return;
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: config.nodemailer.user,
          pass: config.nodemailer.pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      var mailOptions = {
        from: `"swengineer" <${config.nodemailer.user}>`, // sender address
        to: user.email, // list of receivers
        subject: 'Password Reset', // subject line
        text: 'Hi ' + user.name + ',\n\n' +
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          host + '/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n' // plain text body
      };
      smtpTransport.sendMail(mailOptions);
      code = 200;
      res.status(code).json(response);
    }
  ]);
});

router.get('/reset/:token', function (req, res) {
  const token = req.params.token;

  let code = 400;
  let response = {
    resetError: ''
  };

  User.findOne({ resetPasswordToken: token }, function (err, user) {
    if (!user) {
      response.resetError = 'Invalid token'
      res.status(code).json(response);
      return;
    } else if (user.resetPasswordExpires < Date.now()) {
      code = 401;
      response.resetError = 'Token has expired'
      res.status(code).json(response);
      return;
    }
    code = 200;
    res.status(code).json(response);
  });
});

router.post('/reset/:token', function (req, res) {
  const { password, passwordConfirm } = req.body;
  const token = req.params.token;

  let code = 404;
  let response = {
    passwordError: '',
    passwordConfirmError: '',
    resetError: ''
  };

  User.findOne({ resetPasswordToken: token }, function (err, user) {
    if (!user) {
      response.resetError = 'Invalid token'
      res.status(code).json(response);
      return;
    } else if (user.resetPasswordExpires < Date.now()) {
      code = 401;
      response.resetError = 'Token has expired'
      res.status(code).json(response);
      return;
    }

    if (!password) {
      code = 400;
      response.passwordError = 'Invalid password';
      res.status(code).json(response);
      return;
    } else if (!passwordConfirm || password !== passwordConfirm) {
      code = 400;
      response.passwordConfirmError = 'Passwords do not match';
      res.status(code).json(response);
      return;
    }

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save();

    code = 200;
    res.status(code).json(response);
  });
});

module.exports = router;
