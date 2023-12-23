import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import ProfileSchema from '../models/profile.js'
import Express from 'express'

// for development purposes
let SALT_ROUNDS = 11
let TOKEN_KEY = 'areallylonggoodkey'

// for production
if (process.env.NODE_ENV === 'production') {
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
  TOKEN_KEY = process.env.TOKEN_KEY
}


export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    
    const user = new User({ name, email, password_digest });
    await user.save();

    const payload = { name: user.name, id: user._id, email: user.email };
    const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '60d' }); // Token expires in 60 days

    // const profile = await ProfileSchema.findOne({ user: user._id });
    // const hasProfile = !!profile;

    // Include hasProfile information in the response
    res.status(201).json({
      token,
      // hasProfile: hasProfile
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('name email password_digest');
    const profile = await ProfileSchema.findOne({ user: user._id }); // Assuming Profile model exists

    if (user && await bcrypt.compare(password, user.password_digest)) {
      const payload = { name: user.name, id: user._id, email: user.email };
      const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '60d' });

      res.status(200).json({
        token,
        hasProfile: !!profile // Boolean indicating if profile exists
      });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// export const signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select('name email password_digest');

//     if (user && await bcrypt.compare(password, user.password_digest)) {
//       const payload = { name: user.name, id: user._id, email: user.email };
//       const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '60d' }); // Token expires in 60 days

//       res.status(200).json({ token });
//     } else {
//       res.status(401).send('Invalid Credentials');
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    res.json(payload);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).send('Token expired');
    } else {
      res.status(401).send('Not Authorized');
    }
  }
};





export const changePassword = async (req, res) => {}