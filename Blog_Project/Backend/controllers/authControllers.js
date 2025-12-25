import AuthModel from "../models/authModel.js";
import bcrypt from "bcrypt"



export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = AuthModel({
            email: email,
            password: hashedPassword
        })

        const result = await user.save()
        res.json({ message: "user registered successfully !", result })
    } catch (error) {
        res.status(401).json({ message: "cant registered user !", err: error.message })
    }

}

export const signIn = async (req, res) => {
    const { email, password } = req.body

    const user = await AuthModel.findone({ email: email })

    if (!user) {
        res.status(400).json({ message: "user not registered !" })
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if (isMatched) {
        res.json({ message: "user signin successfully !!" });
    }
    else {
        res.status(400).json({ message: "password is incorrect !" });
    }
}