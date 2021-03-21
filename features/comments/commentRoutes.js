const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createComment, getComments, updateComment, deleteComment } = require('./commentAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');

const router = Router();
router.use( jwtValidator );

/*
    Comments Routes
    host + /api/comments
*/

router.post('/',
    [
        check("content", "The content can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    createComment);

router.get("/:id", getComments);

router.put("/:id",
    [
        check("content", "The content can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    updateComment);

router.delete("/:id", deleteComment);


module.exports = router;
