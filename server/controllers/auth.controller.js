const authService = require('../services/auth.service')

exports.register = async (req, res) => {
    console.log("from auth controller: ", req.body)
    try {
        const result = await authService.register(req.body)
        console.log("register result:", result)
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.expose ? err.message : "Internal Server Error",
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { user, token } = await authService.login(req.body)
        console.log("from login controller:", user, token)
        res.status(200).json({
            success: true,
            message: "Login Successfull",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                accessToken: token,
            }
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.expose ? err.message : "Internal Server Error",
        });
    }
}