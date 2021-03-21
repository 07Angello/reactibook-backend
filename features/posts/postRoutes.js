const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createPost, getPosts, updatePost, deletePost, getPost, getAllPosts } = require('./postAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');
const { isDate } = require('../../helpers/isDate');

const router = Router();
router.use( jwtValidator );

/*
    Posts Routes
    host + /api/posts
*/

router.post('/',
    [
        check("content", "The content can not be null or empty.").not().isEmpty(),
        check("filter", "The filter by option can not be null or empty.").not().isEmpty(),
        //check('creationDate', 'Creation Date is required.').custom( isDate ),
        fieldsValidator
    ],
    createPost);

router.get("/:filter/:userId", getPosts);

router.put("/:id",
    [
        check("content", "The content can not be null or empty.").not().isEmpty(),
        check("filter", "The filter by option can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    updatePost);

router.delete("/:id", deletePost);

router.get("/:id", getPost);

router.get("/all/wall/ups", getAllPosts);

module.exports = router;
