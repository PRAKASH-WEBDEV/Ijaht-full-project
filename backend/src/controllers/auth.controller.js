const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const { generateToken } = require("../utils/token.utils");
const { sendEmail } = require("../utils/email.utils");
const { createPasswordResetEmail } = require("../utils/emailTemplates");
const { frontendUrl } = require("../config/env");

const PASSWORD_RESET_EXPIRY_MINUTES = 15;

const hashResetToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const getFrontendResetUrl = (token) => {
  return `${frontendUrl()}/reset-password?token=${encodeURIComponent(token)}`;
};

exports.register = async (req, res) => {
  try {
    const { name = "", email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const [firstName = "", ...lastNameParts] = name.trim().split(/\s+/);

    const user = await User.create({
      name,
      firstName,
      lastName: lastNameParts.join(" "),
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!adminEmail) {
      console.error("Forgot password admin email not configured");
      return res.status(500).json({ message: "Password reset is not configured" });
    }

    const isAdminEmail = email === adminEmail;

    if (!isAdminEmail) {
      return res.status(403).json({
        message: "Password reset is available only for the administrator account.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashResetToken(resetToken);
    const resetExpiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MINUTES * 60 * 1000);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = resetExpiresAt;
    user.forgotPasswordOTP = undefined;
    user.forgotPasswordOTPExpiry = undefined;
    await user.save();

    const resetUrl = getFrontendResetUrl(resetToken);

    await sendEmail({
      to: email,
      subject: "Reset Your IJHAT Password",
      html: createPasswordResetEmail({
        resetUrl,
        recipientLabel: "IJHAT user account",
        expiry: `${PASSWORD_RESET_EXPIRY_MINUTES} minutes`,
      }),
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Forgot password failed:", {
      email: req.body?.email,
      message: error.message,
      name: error.name,
      statusCode: error.statusCode,
      response: error.response,
    });
    res.status(500).json({ message: "Password reset request failed" });
  }
};

exports.validateResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Reset token is required" });
    }

    const user = await User.findOne({
      resetPasswordToken: hashResetToken(token),
      resetPasswordExpire: { $gt: Date.now() },
    }).select("_id");

    if (!user) {
      return res.status(400).json({ message: "Reset link is invalid or expired" });
    }

    return res.json({ message: "Reset token is valid" });
  } catch (error) {
    console.error("Validate reset token failed:", {
      message: error.message,
      name: error.name,
    });
    return res.status(500).json({ message: "Reset token validation failed" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.body;
    const newPassword = req.body.newPassword || req.body.password;

    if (!token) {
      return res.status(400).json({ message: "Reset token is required" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const hashedToken = hashResetToken(token);
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Reset link is invalid or expired" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.forgotPasswordOTP = undefined;
    user.forgotPasswordOTPExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password failed:", {
      message: error.message,
      name: error.name,
    });
    res.status(500).json({ message: "Password reset failed" });
  }
};
