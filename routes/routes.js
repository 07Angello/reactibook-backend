const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// Importing Routes
const authentication = require('../features/authentication/authRoutes');
const posts = require('../features/posts/postRoutes');
const comments = require('../features/comments/commentRoutes');

// Implementing Routes
router.use(`${apiPrefix}/auth`, authentication);
router.use(`${apiPrefix}/posts`, posts);
router.use(`${apiPrefix}/comments`, comments);


module.exports = router;
