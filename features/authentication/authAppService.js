const { response } = require('express');
const User = require('./User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../../helpers/jwt');

// POST: api/auth/register/
const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const isExistingUser = await User.findOne({ email: email });
        if( isExistingUser ) {
            return res.status(400).json({
                OK: false,
                Message: 'An user already exists with this e-mail.',
                Data: null
            });
        }

        const newUser = new User( req.body );

        // encrypting password
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt );

        await newUser.save();

        // JWT generated
        const generatedToken = await generateJWT( newUser.id, newUser.name );

        newUser.password = '*******';
        return res.status(201).json({
            OK: true,
            Message: '',
            Data: newUser,
            Token: generatedToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Message: 'This user could not be created.',
            Data: null
        });
    }
}

// POST: api/auth/
const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if ( !existingUser ) {
            return res.status(401).json({
                OK: false,
                Message: 'Either the e-mail or the password is invalid.',
                Data: null
            });
        }

        // comparing password
        const validatedPassword = bcrypt.compareSync( password, existingUser.password );
        if ( !validatedPassword ) {
            return res.status(401).json({
                OK: false,
                Message: 'The password is incorrect.',
                Data: null
            });
        }

        const generatedToken = await generateJWT( existingUser.id, existingUser.name );

        existingUser.password = '*******';
        console.log(existingUser);
        return res.status(202).json({
            OK: true,
            Message: '',
            Data: existingUser,
            Token: generatedToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Message: 'The login could not be processed.',
            Data: null
        });
    }
}

// GET: api/auth/renew-token/
const renewToken = async(req, res = response) => {
    const { uid, name, profilePhoto, coverPhoto } = req;

    console.log(uid, name, profilePhoto, coverPhoto);

    const generatedToken = await generateJWT( uid, name );

    return res.json({
        OK: true,
        Message: '',
        Data: { _id:uid, name, profilePhoto, coverPhoto },
        Token: generatedToken
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
