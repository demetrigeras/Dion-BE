import jwt from 'jsonwebtoken'


// const TOKEN_KEY = process.env.TOKEN_KEY;

let TOKEN_KEY = 'areallylonggoodkey'
//reminded when you go to production
export const verifyusers = (req, res, next) => {
    try {
      // Extract the token from the authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send('Authorization header missing');
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).send('Token not provided');
      }
  
      // Verify the token
      const payload = jwt.verify(token, TOKEN_KEY);
  
      // Attach the decoded payload to the request object
      req.user = payload;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      // Differentiate between TokenExpiredError and other errors
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Token expired');
      } else {
        return res.status(401).send('Invalid token');
      }
    }
  };