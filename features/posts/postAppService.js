const { response } = require('express');
const Post = require('./Post');

// POST: api/posts/
const createPost = async(req, res = response) => {
    const post = new Post(req.body);
    
    try {
        // post.user = req.uid;
        const newPost = await post.save();

        res.status(201).json({
            OK: true,
            Message: '',
            Data: newPost
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            OK: false,
            Message: 'An error has ocurred. Contact with the IT manager.',
            Data: null
        });
    }
}

module.exports = {
    createPost,
};
