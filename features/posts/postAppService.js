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

// GET: api/posts/
const getPosts = async( req, res = response ) => {
    console.log('test')
    const { pageNumber } = req.body;
    const filteredPosts = req.params.filter;

    const pgNumber = pageNumber == 0 ? 0 : Number(pageNumber);
    const srchPosts = filteredPosts == null || filteredPosts == '' || filteredPosts == 'ALL' ? '' : filteredPosts;

    const regex = new RegExp(srchPosts, 'i');

    await Post.find( {"filter": regex} )
                .sort({'createdAt': 'descending' })
                .populate( 'user' )
                .exec(( err, posts ) => {
                    if (err) {
                        return res.status(400).json({
                            Data: "",
                            Message: err.message
                        });
                    }

                    if (!posts || posts.length === 0) {
                        return res.status(204).json({
                            Data: "",
                            Message: "Could not founds posts with these filters."
                        });
                    }

                    return res.status(200).json({
                        Data: posts,
                        Message: ""
                    });
                });
}

module.exports = {
    createPost,
    getPosts
};
