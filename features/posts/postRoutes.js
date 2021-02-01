const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fields-validator');
const { createPost, getPosts } = require('./postAppService');

const router = Router();

/*
    Posts Routes
    host + /api/posts
*/

router.post('/',
    [
        check("content", "The content can not be null or empty.").not().isEmpty(),
        check("filter", "The filter by option can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    createPost);

router.get("/", getPosts);

module.exports = router;
