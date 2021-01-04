const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const cors = require('cors');

const ID = require('../modules/ID');
const confirmViaEmail = require('../modules/confirmViaEmail');

const router = express.Router();

const corsOptions = {
    origin: config.get('CORS.white'),
    optionsSuccessStatus: config.get('CORS.optionsSuccessStatus')
}

router.post('/reg',
    cors(corsOptions), [
        check('user.email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('user.password', config.get('msgs.typeErrors.passwordMinLength')).isLength({ min: 6 }),
        check('user.password', config.get('msgs.typeErrors.passwordMaxLength')).isLength({ max: 120 }),
        check('user').custom(async val => {
            return await User.findOne({ email: val.email }).then(candidate => {
                if (candidate) {
                    return Promise.reject(config.get('msgs.typeErrors.hasDefined'));
                }
            });
        }),
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reqBody = JSON.parse(JSON.stringify(req.body));

            const email = reqBody.user.email;
            const password = reqBody.user.password;

            const user = new User({
                id: ID.createID(0),
                email,
                password,
                active: false
            });

            await user.save();

            const confirmSettings = {
                email,
                middleUrl: '/api/auth',
                subject: 'Подтвердите регистрацию',
                html: '<p>Подтвердите регистрацию, перейдя по ссылке ниже</p>',
                act: "reg"
            }

            confirmViaEmail(confirmSettings);

            return res.status(200).json({
                msg: config.get('msgs.messages.auth')
            })
        } catch (err) {
            console.log(err.stack)
            return res.status(500).json({
                msg: config.get("msgs.statuses.500err")
            });
        }
    }
);

router.post('/confirmReg',
    cors(corsOptions), [
        check('user.email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('user').custom(async val => {
            return await User.findOne({ email: val.user.email }).then(candidate => {
                if (!candidate) {
                    return Promise.reject(config.get('msgs.typeErrors.hasNotDefined'));
                }
            })
        })
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const reqBody = JSON.parse(JSON.stringify(req.body));

        const confirmSettings = {
            email: reqBody.user.email,
            middleUrl: '/api/auth',
            subject: 'Подтвердите регистрацию',
            html: '<p>Подтвердите регистрацию, перейдя по ссылке ниже</p>',
            act: "reg"
        }

        confirmViaEmail(confirmSettings);

        return res.send(200).json({
            msg: config.get('msgs.messages.sendedMail')
        })
    }
);

router.post('/login',
    cors(corsOptions), [
        check('user.email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('user').custom(async val => {
            return await User.findOne({ email: val.user.email }).then(user => {
                if (!user) {
                    return Promise.reject(config.get('msgs.typeErrors.hasNotDefined'));
                }

                if (val.user.password !== user.password) {
                    return Promise.reject(config.get('msgs.typeErrors.incorrectPassword'));
                }
            });
        })
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reqBody = JSON.parse(JSON.stringify(req.body));

            const email = reqBody.user.email;

            const user = await User.findOne({ email });

            return res.status(200).json({
                msg: config.get('msgs.messages.login'),
                user
            })
        } catch (err) {
            return res.status(500).json({
                msg: config.get("msgs.statuses.500err")
            });
        }
    }
);

router.post('/delete',
    cors(corsOptions), [
        check('user.email', config.get('msgs.typeErrors.incorrectEmail'))
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reqBody = JSON.parse(JSON.stringify(req.body));

            const email = reqBody.email;

            await User.remove({ email });

            return res.status(200).json({
                msg: config.get('msgs.messages.deleteUser')
            })
        } catch (err) {
            return res.status(500).json({
                msg: config.get("msgs.statuses.500err")
            })
        }
    }
);

router.post('/forgetPassword',
    cors(corsOptions), [
        check('email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('email').custom(async val => {
            return await User.findOne({ email: val.email }).then(candidate => {
                if (!candidate) {
                    return Promise.reject('msgstypeErrors.hasNotDefined');
                }
            });
        })
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reqBody = JSON.parse(JSON.stringify(req.body));

            const email = reqBody.email;

            const oldPassword = user.password;

            const confirmSettings = {
                email,
                middleUrl: '/api/auth',
                subject: 'Подтвердите восстановление пароля',
                html: '<p>Подтвердите восстановление пароля, перейдя по ссылке ниже</p>',
                act: "forgetPass",
                oldPassword
            }

            confirmViaEmail(confirmSettings);

            return res.status(200).json({
                msg: config.get('msgs.messages.emailPassword')
            })
        } catch (err) {
            return res.status(500).json({
                msg: config.get("msgs.statuses.500err")
            })
        }
    }
);

router.post('/passwordRecovery',
    cors(corsOptions), [
        check('email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('oldPassword').custom(async val => {
            return await User.findOne({ email: val }).then(user => {
                if (!user) {
                    return Promise.reject(config.get('msgs.typeErrors.hasNotDefined'));
                }

                if (user.password !== val.user.password) {
                    return Promise.reject(config.get('msgs.typeErrors.incorrectPassword'));
                }
            });
        })
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reqBody = JSON.parse(JSON.stringify(req.body));

            const email = reqBody.email;
            let oldPassword = reqBody.oldPassword;

            const user = await User.findOne({ email });

            const s = 1000;
            const m = s * 60;
            const h = m * 60;
            const d = h * 24;

            jwt.verify(oldPassword, config.get("JWT.recoveryPassword"), async(err, decoded) => {
                oldPassword = decoded.password;
                if (oldPassword !== user.password) {
                    return res.status(200).json({
                        msg: config.get('msgs.typeErrors.icorrectPassword')
                    });
                }

                await User.updateOne({ email }, { $set: { password: reqBody.newPassword } });

                return res.status(200).json({
                    msg: config.get('msgs.messages.editPassword')
                });
            });
        } catch (err) {
            return res.status(500).json({
                msg: config.get("msgs.statuses.messages")
            });
        }
    }
);

router.get('/verify',
    async(req, res) => {
        try {
            const token = req.query.id;
            if (token) {
                jwt.verify(token, config.get("JWT.email"), async(err, decoded) => {
                    if (err) {
                        return res.status(500).json({
                            err: err.stack,
                        });
                    } else {
                        const act = decoded.act;

                        if (act === "reg") {
                            const email = decoded.email;

                            const user = await User.findOne({ email });

                            if (!user) {
                                return res.status(200).json({
                                    msg: config.get('msgs.typeError.hasNotDefined')
                                });
                            }

                            await User.updateOne({ email: email }, { $set: { active: true } });

                            let activeStatus;

                            await User.findOne({ email: email }).then(
                                async res => {
                                    activeStatus = await res.active;
                                }
                            );

                            if (activeStatus) {
                                res.send(config.get('msgs.messages.login'));
                            }
                        } else if (act === "forgetPass") {
                            const email = decoded.email;

                            const user = await User.findOne({ email });

                            if (!user) {
                                return res.status(200).json({
                                    msg: config.get('msgs.typeError.hasNotDefined')
                                });
                            }

                            const date = new Date();

                            const toSend = {
                                "email": email,
                                "password": user.password,
                                "created": date.toString(),
                            }

                            const token = jwt.sign(toSend, config.get('JWT.recoveryPassword'), { expiresIn: "1h" });

                            const form = `
                            <h1>Подтвердите смену пароля</h1>

                            <form>
                                <input type="password">
                                <input type="submit">
                            </form>

                            <script>
                                const input = document.querySelector('input');
                                const form = document.querySelector('form');

                                form.addEventListener('submit', ev => {
                                    ev.preventDefault();
                                    fetch('${config.get("mainUrl")}/api/auth/passwordRecovery', {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            email: '${email}',
                                            oldPassword: '${token}',
                                            newPassword: input.value
                                        })
                                    }).then(res => res.json()).then(res => console.log(res));
                                });
                            </script>
                            `
                            return res.send(form);
                        }
                    }
                });
            } else {}
        } catch (err) {
            return res.status(500).json({
                msg: config.get("500err")
            })
        }
    }
);

module.exports = router;