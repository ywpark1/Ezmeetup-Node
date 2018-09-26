'use strict';

const router = require('express').Router();
const { authJwt } = require('../middleware/auth');


router.get('/', (req, res) => {
    res.send('This is PRJ666 EzMeetup Frontpage.');
    // res.render('index', { title: 'My Express App', message: 'Hello' });
});

router.get('/hello', authJwt, (req, res) => {
    res.send('This is a private route!!!!');
});

router.get('/:version', (req, res) => {
    res.send('This is PRJ666 EzMeetup API version ' + req.params.version + '!');
    // res.render('index', { title: 'My Express App', message: 'Hello' });
});



module.exports = router;