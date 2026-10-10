const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    html: { type: String, },
    attachments: { type: String, },
    userMail: { type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model("Email", emailSchema);