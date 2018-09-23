'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('This is PRJ666 EzMeetup Frontpage.');
    // res.render('index', { title: 'My Express App', message: 'Hello' });
});

router.get('/:version', (req, res) => {
    res.send('This is PRJ666 EzMeetup API version ' + req.params.version + '!');
    // res.render('index', { title: 'My Express App', message: 'Hello' });
});

module.exports = router;