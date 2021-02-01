const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';

// Importing Routes
const posts = require('../features/posts/postRoutes');

// Implementing Routes
router.use(`${apiPrefix}/posts`, posts);

module.exports = router;
