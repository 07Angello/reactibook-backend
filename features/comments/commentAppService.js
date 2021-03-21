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

        comment.isEdited = false;

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

// GET: api/comments/:postId
const getComments = async( req, res = response ) => {
    const postId = req.params.id;

    await Comment.find({ "post": postId })
                .sort({'createdAt': 'descending' })
                .populate( 'user', 'name profilePhoto' )
                .exec(( err, comments ) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: null,
                            Message: err.message
                        });
                    }

                    if (!comments || comments.length === 0) {
                        return res.status(200).json({
                            OK: true,
                            Data: [],
                            Message: 'There are no comments to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: comments,
                        Message: ''
                    });
                });
}

// PUT: api/comments/:id
const updateComment = async(req, res = response) => {
    const commentId = req.params.id;
    const uid = req.uid;

    const comment = await Comment.findById( commentId )
                                    .populate( 'user', '_id' );

    try {
        if ( !comment ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any comment to update'
            });
        }

        if ( comment.user.id !== uid ) {
            return res.status(401).json({
                OK: false,
                Data: null,
                Message: 'Your are NOT the owner of this comment. Could not be updated.'
            });
        }

        const newComment = {
            ...req.body,
            isEdited: true,
            user: uid
        }

        const commentUpated = await Comment.findByIdAndUpdate(commentId, newComment, { new: true })
                                        .populate( 'user', 'name profilePhoto' );
            
        return res.status(201).json({
            OK: true,
            Data: commentUpated,
            Message: ''
        });
    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Data: null,
            Message: 'An error has ocurred. Contact with the IT manager.'
        });
    }
}

// DELETE: api/comments/:id
const deleteComment = async(req, res = response) => {
    const commentId = req.params.id;
    const uid = req.uid;

    const comment = await Post.findById( postId )
                            .populate( 'user', '_id' );;

    try {
        if ( !comment ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any comment to delete.'
            });
        }

        if ( comment.user.id !== uid ) {
            return res.status(401).json({
                OK: false,
                Data: null,
                Message: 'Your are NOT the owner of this comment. Could not be updated.'
            });
        }

        await Comment.findByIdAndDelete( commentId );

        return res.status(200).json({
            OK: true,
            Data: comment,
            Message: ''
        });
    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Data: null,
            Message: 'An error has ocurred. Contact with the IT manager.'
        });
    }
}

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
}