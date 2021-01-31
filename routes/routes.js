const { Router } = require('express');
const router = Router();
const apiPrefix = 'api';

// Importing Routes
const postRoutes = require('../features/posts/postRoutes');

// Implementing Routes
router.use(`${apiPrefix}/posts`, postRoutes);

module.exports = router;
