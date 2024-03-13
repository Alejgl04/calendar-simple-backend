
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validJWT = (req, res = response, next ) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      ok: false,
      message: 'There is not token in the request'
    })
  }
  
  try {
    
    const {uid, name} = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )

    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token not valid in the request'
    })
  }
  
  next();

}


module.exports = {
  validJWT
}