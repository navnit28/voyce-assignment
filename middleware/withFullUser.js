const User = require('@model/userSchema')

const withFullUser = async (req, res, next) => {
    try {
        req.user = await User.findOne({
            user_id: req.header('x-api-username')
        })
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An Error occured"
        });
    }


}
module.exports = withFullUser