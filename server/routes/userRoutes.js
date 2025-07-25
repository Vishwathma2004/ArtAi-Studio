import express from 'express';
import { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay } from '../controller/userController.js';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser); 
userRouter.get('/credits',userAuth,userCredits); 
userRouter.post('/pay',userAuth,paymentRazorpay); 
userRouter.post('/verify',userAuth,verifyRazorpay); 


export default userRouter;
