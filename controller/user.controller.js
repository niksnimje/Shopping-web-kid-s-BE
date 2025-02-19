const UserModel = require("../Model/User.model")
const dotenv=require("dotenv")
dotenv.config()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const singup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validate required fields
        if (!name || !email|| !password || !confirmPassword ) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // Check if the user already exists using either email or mobileNumber
        const existingUser = await UserModel.findOne({email});

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        // Generate JWT token
        const token = jwt.sign(
            { userData: { name,email, _id: newUser._id, role: newUser.role } },
            process.env.PRIVATE_KEY
        );

        // Set the token in an HTTP-only cookie
        // res.cookie("verificationToken", token);
        res.cookie("verificationToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        // Send success response
        res.status(201).json({
            message: "You Are Register successfully!",
            token,
            userData: { name,email, _id: newUser._id, role: newUser.role },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const singin = async (req, res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all information" });
    }

    const isExistUser = await UserModel.findOne({ email });
    if (!isExistUser) {
        return res.status(400).json({ message: "User not found! Please sign up." });
    }

    bcrypt.compare(password, isExistUser.password, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Error in password comparison" });
        }
        if (result) {
            const { password, ...rest } = isExistUser._doc;

            // ✅ Include `role` in JWT token
            jwt.sign(
                { userData: rest },
                process.env.PRIVATE_KEY,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) {
                        return res.status(400).json({ message: "Error creating JWT token" });
                    }

                    res.cookie("verificationToken", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 3600000
                    });

                    return res.status(200).json({
                        message: "Login successful!",
                        token,
                        userData: rest
                    });
                }
            );
        } else {
            return res.status(400).json({ message: "Incorrect password" });
        }
    });
};



module.exports={singup,singin}
