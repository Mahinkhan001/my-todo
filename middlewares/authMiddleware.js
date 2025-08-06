const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // getting token
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'No token provided',
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized user',
        });
      } else {
        req.user = decode;  //  storing decoded token
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Please provide a valid auth token',
      error,
    });
  }
};
