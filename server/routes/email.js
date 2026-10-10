require("dotenv").config();

const Email = require("../models/Email.js");
const nodemailer = require("nodemailer");
const exppress = require("express");
const emailRouter = exppress.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});

emailRouter.post("/send", async (req, res) => {
    try {
        const email = await Email.create(req.body);
        if (!email.to || !email.subject || !email.text) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const info = await transporter.sendMail({
            from: `"Kavinraj S" <${process.env.email}>`,
            to: email.to,
            subject: email.subject,
            text: email.text,
            html: email.html,
            attachments: [
                {
                    filename: "Kavinraj_S_Resume_FD.pdf",
                    path: "./attachments/Kavinraj_S_Resume_FD.pdf"
                }
            ],
            userMail: email.userMail,
        });
        console.log("message sent to ", email.to, " : ", info.response);
        email.attachments = "Kavinraj_S_Resume_FD.pdf";
        await email.save();
        return res.status(200).json({ message: "Message sent successfully" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
});

emailRouter.get("/getemails/:userMail", async (req, res) => {
    try {
        const userMail = req.params.userMail;
        const emails = await Email.find({ userMail });
        return res.status(200).json(emails);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
module.exports = emailRouter;