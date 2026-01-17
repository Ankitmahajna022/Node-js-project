import nodemailer from "nodemailer"

export const sendOtpMail = async(email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions = {
            from: `"Healthcare Admin"<${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP for Logion",
            html: `
            <div style="font-family: Arial, sans-serif">
            <h2>OTP Verification</h2>
            <p>Your One-Time Password (OTP) is:</p>
            <h1 style="color:#2e86de">${otp}</h1>
            <p>This OTP is valid for <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
            `
        }

        await transporter.sendMail(mailOptions)
        console.log("OTP email sent successfully")
    } catch (error) {
        console.error("OTP email error:", error)
    }
}