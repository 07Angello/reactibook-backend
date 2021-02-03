const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';

// Importing Routes
const posts = require('../features/posts/postRoutes');
const authentication = require('../features/authentication/authRoutes');

// Implementing Routes
router.use(`${apiPrefix}/posts`, posts);
router.use(`${apiPrefix}/auth`, authentication);

module.exports = router;
