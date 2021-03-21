const { response } = require('express');
const Comment = require('./Comment');
const User = require('../authentication/User');

// POST: api/comments/
const createComment = async(req, res = response) => {
    const uid = req.body.uid;
    const comment = new Comment(req.body);
    
    try {
        comment.user = req.uid;
        comment.post = req.pid;

        post.isEdited = false;

        const userInfo = await User.findById( uid );
        const newComment = await comment.save();

        newComment.user = userInfo;

        res.status(201).json({
            OK: true,
            Message: '',
            Data: newComment
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