const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const registerUser = async(req, res = response) => {

  const {name, email, password} = req.body;

  try {

    const userDb = await findUser(email);

    if ( userDb ) {
      return res.status(400).json({
        ok: false,
        message: `Email: ${email} already exists`
      })
    }
    const user = new User( req.body );

    const salt = bcrypt.genSaltSync(12);
    user.password = bcrypt.hashSync( password, salt );
    
    await user.save();
    
    const token = await generateJWT( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    })
  }
}


const signInUser =  async(req, res = response) => {

  const { email, password } = req.body;

  try {

    const userDb = await findUser(email);

    if ( !userDb ) {
      return res.status(400).json({
        ok: false,
        message: `User with that email [${email}] do not exist in our records`
      })
    }

    // Password
    const checkPassword = bcrypt.compareSync( password, userDb.password );

    if ( !checkPassword ) {
      return res.status(400).json({
        ok: false,
        message: 'Wrong password'
      })
    }

    const token = await generateJWT( userDb.id, userDb.name );

    res.json({
      ok: true,
      uid: userDb.id,
      name: userDb.name,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    })
  }

}

const reTokenUser = async(req, res= response) => {

  const uid = req.uid;
  const name = req.name;
  const token = await generateToken( uid, name );

  res.json({
    ok: true,
    token
  })

} 

const findUser = async(email) => {

  try {
    
    let user = await User.findOne({email})
    return user;

  } catch (error) {
    
  }

}

const generateToken = async(uid, name) => {
  const token = await generateJWT( uid, name );
  return token;
}

module.exports = {
  registerUser,
  signInUser,
  reTokenUser
}
