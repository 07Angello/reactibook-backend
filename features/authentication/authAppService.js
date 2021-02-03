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
            Message: '',
            Data: newUser,
            Token: generatedToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
            return res.status(400).json({
                Message: 'Either the e-mail or the password is invalid.',
                Data: null
            });
        }

        // comparing password
        const validatedPassword = bcrypt.compareSync( password, existingUser.password );
        if ( !validatedPassword ) {
            return res.status(400).json({
                Message: 'The password is incorrect.',
                Data: null
            });
        }

        const generatedToken = await generateJWT( existingUser.id, existingUser.name );

        existingUser.password = '*******';
        return res.status(201).json({
            Message: '',
            Data: existingUser,
            Token: generatedToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: 'The login could not be processed.',
            Data: null
        });
    }
}

// GET: api/auth/renew/
const renewToken = async(req, res = response) => {
    const { uid, name } = req

    const generatedToken = await generateJWT( uid, name );

    return res.json({
        Message: '',
        Data: { _id:uid, name },
        Token: generatedToken
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
