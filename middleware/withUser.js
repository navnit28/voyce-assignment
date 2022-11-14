const withUser = async (req, res, next) => {
    try {
        console.log(req.header('x-api-username'))
        // var user = await User.findOne({
        //     sid: req.header('x-api-username')
        // })

        req.user = {
            sid: req.header('x-api-username')
        }
        // req.cust_user = await user.custInfo()
        // console.log(resp)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An Error occured"
        });
    }


}
module.exports = withUser