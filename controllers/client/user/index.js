const asyncHandler = require('express-async-handler');
const _ = require('lodash');
const aqp = require('api-query-params');
const User=require('@model/userSchema.js');


const postUser = asyncHandler(async (req,res) => {
    try{
        const user = new User();
        await user.save();
        res.send(user);
    }catch(err){
        res.status(500).json({
            message:err
        });
    }
})
const getBalance = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({
            message:'User not found'
        });
    }
    res.json({
        balance:user.balance
    });
})
const transferBalance = asyncHandler(async (req,res) => {
    const {from,to,amount} = req.body;
    const fromUser = await User.findById(from);
    const toUser = await User.findById(to);
    if(!fromUser || !toUser){
        res.status(404).json({
            message:'User not found'
        });
    }
    if(fromUser.balance < amount){
        res.status(400).json({
            message:'Insufficient balance'
        });
    }
    fromUser.balance -= amount;
    toUser.balance += amount;
    await fromUser.save();
    await toUser.save();
    res.json({
        message:'Balance transferred successfully'
    });
})
module.exports={
    postUser,
    getBalance,
    transferBalance
}
