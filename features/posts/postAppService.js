const { response } = require('express');
const Post = require('./Post');
const User = require('../authentication/User');

// POST: api/posts/
const createPost = async(req, res = response) => {
    const post = new Post(req.body);
    
    try {
        post.user = req.uid;
        post.isEdited = false;

        const userInfo = await User.findById( post.user );
        const newPost = await post.save();

        newPost.user = userInfo;

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

// GET: api/posts/:filter/:userId
const getPosts = async( req, res = response ) => {
    const filteredPosts = req.params.filter;
    const userId = req.params.userId;

    const srchPosts = filteredPosts == null || filteredPosts == '' || filteredPosts == 'ALL' ? '' : filteredPosts;

    const regex = new RegExp(srchPosts, 'i');

    await Post.find( {"user": userId, "filter": regex} )
                .sort({'createdAt': 'descending' })
                .populate( 'user', 'name profilePhoto' )
                .exec(( err, posts ) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: null,
                            Message: err.message
                        });
                    }

                    if (!posts || posts.length === 0) {
                        return res.status(200).json({
                            OK: false,
                            Data: null,
                            Message: 'You do not have posts with this filter yet.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: posts,
                        Message: ''
                    });
                });
}

// GET: api/posts/wall
const getAllPosts = async( req, res = response ) => {
    await Post.find( {"filter": 'PUBLIC'} )
                .sort({'createdAt': 'descending' })
                .populate( 'user', 'name profilePhoto' )
                .exec(( err, posts ) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: null,
                            Message: err.message
                        });
                    }

                    if (!posts || posts.length === 0) {
                        return res.status(200).json({
                            OK: true,
                            Data: [],
                            Message: 'There are no posts to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: posts,
                        Message: ''
                    });
                });
}

// PUT: api/posts/:id
const updatePost = async(req, res = response) => {
    const postId = req.params.id;
    const uid = req.uid;

    const post = await Post.findById( postId )
                            .populate( 'user', '_id' );

    try {
        if ( !post ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any post to update'
            });
        }

        if ( post.user.id !== uid ) {
            return res.status(401).json({
                OK: false,
                Data: null,
                Message: 'Your are NOT the owner of this post. Could not be updated.'
            });
        }

        const newPost = {
            ...req.body,
            isEdited: true,
            user: uid
        }

        const postUpated = await Post.findByIdAndUpdate(postId, newPost, { new: true })
                                        .populate( 'user', 'name profilePhoto' );
            
        return res.status(201).json({
            OK: true,
            Data: postUpated,
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

// DELETE: api/posts/:id
const deletePost = async(req, res = response) => {
    const postId = req.params.id;

    const post = await Post.findById( postId );

    try {
        if ( !post ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any post to delete.'
            });
        }

        await Post.findByIdAndDelete( postId );

        return res.status(200).json({
            OK: true,
            Data: post,
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

// GET: api/posts/:id
const getPost = async(req, res = response) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById( postId );

        if ( !post ) {
            return res.status(200).json({
                OK: false,
                Data: null,
                Message: 'Could not find any post with this ID.'
            });
        }
            
        return res.status(201).json({
            OK: true,
            Data: post,
            Message: ''
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Data: null,
            Message: 'An error has ocurred. Contact with the IT manager.'
        });
    }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
    getAllPosts
}
