const authService = require('../services/auth.service')

exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body)
        console.log(result)
        res.json({
            success: true,
            status: 201,
            message: "User Created Successfully",
        })
    }catch(err){
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const result = await authService.register(req.body)
        console.log(result)
        res.json({
            success: true,
            status: 200,
            message: "Login Successfully",
        })
    }catch(err){
        console.log(error)
    }
}