const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware');
const config = require('../config');
const Notepad = require('../models/Notepad');

const CHARACTER_LIMIT = 10000;

router.get('/notepad', auth, async (req, res, next) => {
    const token = req.cookies.token;

    let code = 200;
    let response = {
        text: '',
        characterLimit: CHARACTER_LIMIT,
    };

    jwt.verify(token, config.secret.key, function (err, decoded) {
        if (err) { // invalid token
            code = 401;
            res.status(code).json(response);
            return;
        } else {
            let userId = mongoose.mongo.ObjectId(decoded.userId)
            Notepad.findOne({ userId }, function (err, notepad) {
                if (err) {
                    code = 500;
                    res.status(code).json(response);
                    return;
                } else if (!notepad) { // new notepad
                    const notepad = new Notepad({ userId, text: response.text });
                    notepad.save(function (err) {
                        if (err) {
                            code = 500;
                            res.status(code).json(response);
                            return;
                        } else {
                            code = 201;
                            res.status(code).json(response);
                            return;
                        }
                    });
                } else {
                    response.text = notepad.text;
                    res.status(code).json(response);
                    return;
                }
            });
        }
    });
});

router.post('/notepad', auth, async (req, res, next) => {
    const { text } = req.body;
    const token = req.cookies.token;

    let code = 401;
    let response = {
        success: false,
        notepadError: ''
    };

    if (text.length > CHARACTER_LIMIT) {
        code = 400;
        response.notepadError = 'Character limit exceeded'
        res.status(code).json(response);
        return;
    }

    jwt.verify(token, config.secret.key, function (err, decoded) {
        if (err) { // invalid token
            res.status(code).json(response);
            return;
        } else {
            let userId = mongoose.mongo.ObjectId(decoded.userId)
            Notepad.findOne({ userId }, function (err, notepad) {
                if (err) {
                    code = 500;
                    res.status(code).json(response);
                    return;
                } else if (!notepad) { // cannot find notepad
                    code = 404;
                    res.status(code).json(response);
                    return;
                } else {
                    notepad.text = text;
                    notepad.save(function (err) {
                        if (err) {
                            code = 500;
                            res.status(code).json(response);
                            return;
                        } else {
                            code = 200;
                            response.success = true
                            res.status(code).json(response);
                            return;
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
