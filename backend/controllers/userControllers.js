import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";

// @description Register new User
// route        POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res, next) => {
   const { name, email, password } = req.body

   const userExists = await User.findOne({ email: email })
   if (userExists) {
      res.status(400);
      throw new Error('USER already exists')
   }
   const user = await User.create({
      name,
      email,
      password
   })
   if (user) {
      generateToken(res, user._id)
      res.status(201).json(
         {
            _id: user._id,
            name: user.name,
            email: user.email
         }
      )
   } else {
      res.status(400)
      throw new Error('Invalid User Data')
   }
})

// @description Auth User/set token 
// route        POST /api/users/auth
// @access      Public
const authUser = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email: email });

   if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id)
      res.status(200).json(
         {
            _id: user._id,
            name: user.name,
            email: user.email,
         }
      )
   } else {
      res.status(401)
      throw new Error('Invalid Authentication')
   }
})

// @description logout user
// route        POST /api/users/logout
// @access      Public
const logoutUser = asyncHandler(async (req, res, next) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
   })

   res.status(200).json({ message: 'User Logged Out Success' })
})

// @description user Profile
// route        GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res, next) => {
   const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
   };

   res.status(200).json(user)
})


// @description UPDATE User Profile
// route        PUT /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user._id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // Check if the password is provided in the request body
      if (req.body.password) {
         user.password = req.body.password;
      }

      // Save the updated user profile
      const updatedUser = await user.save();

      res.status(200).json({ message: 'User profile updated', user: updatedUser });
   } else {
      res.status(404);
      throw new Error('User not found');
   }
});

export { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile };

