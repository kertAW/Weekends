const express = require('express');
const { check, validationResult } = require('express-validator');
const News = require('../models/News');
const User = require('../models/User');
const config = require('config');
const cors = require('cors');

const ID = require('../modules/ID');

const router = express.Router();

const corsOptions = {
    origin: config.get('CORS.white'),
    optionsSuccessStatus: config.get('CORS.optionsSuccessStatus')
}

router.post('/add',
    cors(corsOptions), [
        check('user.email', 'Введен некорректный email').isEmail(),
        check('user').custom(async val => {
            return await User.findOne({ email: val.email }).then(user => {
                if (!user) {
                    return Promise.reject(config.get('msgs.typeError.hasNotDefined'));
                }
                if (val.password !== user.password) {
                    return Promise.reject(config.get('msgs.typeError.icorrectPassword'));
                }
                if (!user.active) {
                    return Promise.reject(config.get('msgs.typeError.hasNotActive_news'));
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

            const user = await User.findOne({ email });

            const content = reqBody.content;

            const news = new News({
                id: ID.createID(1),
                author: {
                    id: user.id
                },
                content: {
                    headline: content.headline,
                    content: content.content,
                    main: content.main,
                    tags: content.tags
                },
                techInfo: {
                    date: new Date(),
                    rating: null,
                    active: false
                }
            });

            await news.save();

            return res.status(200).json({
                msg: config.get('msgs.messages.public_news')
            });
        } catch (err) {
            console.log(err.stack);
            return res.status(500).json({
                msg: config.get("msgs.statuses.500err")
            })
        }
    }
);

router.post('/edit',
    cors(corsOptions), [
        check('user.email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('user').custom(async val => {
            return await User.findOne({ email: val.email }).then(user => {
                if (!user) {
                    return Promise.reject(config.get('msgs.typeErrors.hasNotDefined'));
                }
                if (val.password !== user.password) {
                    return Promise.reject(config.get('msgs.typeErrors.incorrectPassword'));
                }
                if (!user.active) {
                    return Promise.reject(config.get('msgs.typeErrors.hasNotActive_news'));
                }
            });
        }),
        check('id').custom(async val => {
            return await News.findOne({ id: val }).then(news => {
                if (!news) {
                    return Promise.reject(config.get('msgs.typeErrors.newsNotExists'));
                }
            });
        })
    ], async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const reqBody = JSON.parse(JSON.stringify(req.body));

            console.log(reqBody.content.headline)

            switch (reqBody.content.contentType) {
                case "headline":
                    await News.updateOne({ id: reqBody.id }, { $set: { "content.headline": reqBody.content.content } });
                    break;
                case "content":
                    await News.updateOne({ id: reqBody.id }, { $set: { "content.content": reqBody.content.content } });
                    break;
                case "main":
                    await News.updateOne({ id: reqBody.id }, { $set: { "content.main": reqBody.content.content } });
                    break;
                case "tags":
                    await News.updateOne({ id: reqBody.id }, { $set: { "content.tags": reqBody.content.content } });
                    break;
                default:
                    return res.status(200).json({
                        "msg": `Не существует поля ${reqBody.content.contentType}`
                    });
            }

            return res.status(200).json({
                "msg": config.get('msgs.messages.edit_news')
            });
        } catch (err) {
            return res.status(500).json({
                msg: config.get("msgs.statuses.500err")
            })
        }
    }
);

router.post('/delete',
    cors(corsOptions), [
        check('user.email', config.get('msgs.typeErrors.incorrectEmail')).isEmail(),
        check('user').custom(async val => {
            return await User.findOne({ email: val.email }).then(user => {
                if (!user) {
                    return Promise.reject(config.get('msgs.typeError.hasNotDefined'));
                }
                if (val.password !== user.password) {
                    return Promise.reject(config.get('msgs.typeError.incorrectPassword'));
                }
                if (!user.active) {
                    return Promise.reject(config.get('msgs.typeError.hasNotActive_news'));
                }
            });
        }),
        check('id', config.get('msgs.typeErrors.idNotExists')).not().isEmpty(),
        check('id', "Не является ID").not().matches(ID.validator.identifierValidator),
        check('id').custom(async val => {
            return await News.findOne({ id: val }).then(news => {
                if (!news) {
                    return Promise.reject('msgs.typeErrors.newsNotExist');
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

            await News.remove({ id: reqBody.id })

            res.status(200).json({
                msg: config.get('msgs.messages.delete_news')
            });
        } catch (err) {
            return res.status(500).json({
                msg: config.get('msgs.statuses.500err')
            });
        }
    }
);

router.get('/get/:id',
    cors(corsOptions),
    async(req, res) => {
        try {
            const id = req.params.id;

            if (!ID.validator.identifierValidator.test(id)) {
                return res.status(200).json({
                    msg: config.get('msgs.typeErrors.incorrectID')
                });
            }

            const news = await News.findOne({ id });

            return res.status(200).json({
                msg: config.get('msgs.messages.get_news'),
                news
            });
        } catch (err) {
            return res.status(200).json({
                msg: config.get('msgs.statuses.500err')
            });
        }
    }
);

module.exports = router;