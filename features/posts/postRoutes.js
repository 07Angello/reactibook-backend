const { Router } = require('express');
const { createPost } = require('./postAppService');


const router = Router();

router.post(
    '/',
    [

    ],
    createPost
);

module.exports = router;