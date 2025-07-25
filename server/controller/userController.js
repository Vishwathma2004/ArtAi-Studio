import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import transactionModel from "../models/transactionData.js";
import razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        
        const userData = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            res.json({
                success: true,
                token,
                user: {
                    _id: user._id, // 👈 this is the fix
                    name: user.name
                }
            });
        } else {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const userCredits = async (req, res) => {
    try {
        const userId = req.UserId;  // ✅ get userId from req, not req.body

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
    
})
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);


const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.json({
        success: false,
        message: 'Missing Details',
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let credits, plan, amount;
    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10;
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;
      case 'Business':
        plan = 'Business';
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: 'Plan not found' });
    }

    const transactionPayload = {
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    };

    const newTransaction = await transactionModel.create(transactionPayload);

    const options = {
      amount: amount * 100, // in paise
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log('Razorpay Error:', error);
    res.json({ success: false, message: error.message });
  }
};
const verifyRazorpay = async (req,res)=>{
    try {
        const {razorpay_order_id} = req.body;
        const  orderInfo  = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false,message:"Payment Failed"})
            }
            const userData = await userModel.findById(transactionData.userId)
            
            const creditBalance = userData.creditBalance+transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})
            
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
            res.json({success:true,message:"Payment Successful"})
        }
        else{
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
    }
}

export { registerUser, loginUser , userCredits , paymentRazorpay,verifyRazorpay};

