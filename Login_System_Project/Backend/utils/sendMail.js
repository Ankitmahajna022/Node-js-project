import nodemailer from "nodemailer"

export const sendOtpMail = async (email, otp) => {
    const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Login OTP",
        html: `
        <h2>Login OTP</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
         <p>This OTP is valid for 5 minutes</p>  
        `

    }
    await transpoter.sendMail(mailOptions)
}