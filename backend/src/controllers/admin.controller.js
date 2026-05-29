const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email.utils");

exports.adminLogin = async(req,res)=>{

try{

const {email,password} = req.body;

const admin = await Admin.findOne({email});

if(!admin){

return res.status(401).json({message:"Invalid email"});

}

const isMatch = await bcrypt.compare(password,admin.password);

if(!isMatch){

return res.status(401).json({message:"Invalid password"});

}

const token = jwt.sign(
{ id: admin._id },
process.env.JWT_SECRET,
{ expiresIn:"1d" }
);

res.json({
token,
admin:{
id:admin._id,
email:admin.email
}
});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};

exports.forgotAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({
        message: "If this admin email exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await admin.save();

    const resetUrl = `${
      process.env.ADMIN_RESET_URL || "http://localhost:8000/reset-password"
    }/${resetToken}`;

    await sendEmail({
      to: admin.email,
      subject: "IJHAT Admin Password Reset",
      html: `
        <div style="margin:0;padding:28px;background:#f3f7fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">
          <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e1e9f2;">
            <div style="background:#0056b3;padding:24px 28px;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;">IJHAT Admin Password Reset</h1>
              <p style="margin:8px 0 0;color:#dff4ff;">Secure reset request for the editorial dashboard</p>
            </div>
            <div style="padding:28px;">
              <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">A password reset was requested for your IJHAT admin account.</p>
              <p style="font-size:15px;line-height:1.7;margin:0 0 22px;">This link is valid for 15 minutes.</p>
              <a href="${resetUrl}" style="display:inline-block;background:#0056b3;color:#ffffff;text-decoration:none;font-weight:700;border-radius:8px;padding:13px 18px;">Reset Password</a>
              <p style="font-size:13px;line-height:1.7;color:#64748b;margin:24px 0 0;">If you did not request this reset, you can safely ignore this email.</p>
            </div>
          </div>
        </div>
      `,
    });

    res.json({
      message: "If this admin email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Password reset request failed" });
  }
};

exports.resetAdminPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        message: "Reset link is invalid or expired",
      });
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;
    await admin.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Password reset failed" });
  }
};
