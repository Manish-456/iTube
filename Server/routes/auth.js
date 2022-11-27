import express from 'express'
import { googleAuth, logOut, signIn, signUp } from '../controllers/auth.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router()

// CREATE A USER
router.post('/signup', signUp )
// SIGN IN
router.post('/signin', signIn )

// GOOGLE AUTH
router.post('/google', googleAuth)

// logout
router.get('/logOut', verifyToken, logOut)

export default router;


