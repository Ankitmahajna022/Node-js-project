
// chcke a all fields
export const validateSignupFields = (req, res, next) => {
    const { email, password } = req.body

    if (email && password) {
        next();
    }
    else {
        res.status(400).json({ status: false, message: "all fields are required !" });
    }
}

export const validateSigninFields = (req, res, next) => {
    const { email, password } = req.body

    if (email && password) {
        next()
    }
    else {
        res.status(400).json({ status: false, message: "all fields are required !" })
    }
}

export const validateOtpFields = (req, res, next) => {
    const { email, otp } = req.body

    if (email && otp) {
        next()
    }
    else {
        res.status(400).json({ status: false, message: "all fields are required !" })
    }
}

export const validateChangePasswordFields = (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body

    if (email && oldPassword && newPassword) {
        next()
    }
    else {
        res.status(400).json({ status: false, message: "all fields are required !" })
    }
}

export const validateForgetPasswordFields = (req, res, next) => {
    const { email } = req.body

    if (email) {
        next()
    }
    else {
        res.status(400).json({ status: false, message: "all fields are required !" })
    }
}

export const validateVerifyOtpForCreatePasswordFields = (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    if (email && otp && newPassword) {
        next()
    }
    else {
        res.status(400).json({ status: false, message: "all fields are required !" })
    }
}