const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fields-validator');
const { createPost } = require('./postAppService');

/*
    Posts Routes
    host + /api/posts
*/

const router = Router();

router.post(
    '/',
    [
        check("content", "The content can not be null or empty.").not().isEmpty(),
        check("filter", "The filter by option can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    createPost
);

module.exports = router;
