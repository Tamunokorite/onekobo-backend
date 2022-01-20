const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { User, Account } = require("../models");

const controller = {};

controller.registerUser = async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { name, phone, email, password } = req.body;

        // Validate user input
        if (!(email && password && name && phone)) {
            return res.status(400).json({"error": "All input is required"});
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({"error": "User Already Exist. Please Login"});
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name,
            phone,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        const account = await Account.create({ userEmail: email })

        // return new user
        return res.status(201).json(user);
        } catch (err) {
        console.log(err);
    }
}

controller.loginUser = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          return res.status(400).json({"error":"All input is required"});
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          return res.status(200).json({"user": user});
        }
        return res.status(400).json({"error": "Invalid Credentials"});
      } catch (err) {
        console.log(err);
      }
}

controller.getUsers = async (req, res) => {
    try {
        await User.find({}, (err, result) => {
            if (err) throw err;
            return res.status(200).json({"users": result});
        }).clone().catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
};

controller.getUser = async (req, res) => {
    try {
        const email = req.params.email;
        await User.findOne({ email }, (err, result) => {
            if (err) throw err;
            return res.status(200).json({"user": result});
        }).clone().catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
};

controller.deleteUser = async (req, res) => {
    // Validate if user exist in our database
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (user && user.email ==  req.user.email) {
            await User.deleteOne({ email: email }, (err, obj) => {
                if (err) throw err;
                return res.status(200).json({
                    "success": "User with email address " + user.email + " deleted successfully!"
                });
            }).clone().catch((err) => console.log(err));
        } else {
            return res.status(400).json({"error": "Cannot delete user"});
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = controller