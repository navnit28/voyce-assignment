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
module.exports={
    postUser,
    getBalance
}
