import User from '../models/user';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config';
import nodemailer from 'nodemailer';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    //const salt = bcrypt.genSalt(10), it is random string to hash password
    const hashed_password = await bcrypt.hash(password, 10);
    try {
        const existing_user = await User.findOne({ email });
        if (existing_user) return res.status(409).json({ msg: "User Exists" });
        await User.create({
            name,
            email,
            password: hashed_password,
            role: 'User',
        })
        return res.status(201).json({ msg: "User Created" });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ msg: 'User not found' });
//         const confirm_password = await bcrypt.compare(password, user.password);
//         if (!confirm_password) return res.status(401).json({ msg: 'Incorrect password' });

//         const token = jwt.sign({ email: user.email }, config.jwtSecret);
//         //console.log(token);
//         res.cookie('token', token, { httpOnly: false, secure: false, });
//         //{ httpOnly: true, secure: true }
//         return res.status(200).json({ msg: 'Login Successful' });
//     }
//     catch (err) {
//         return res.status(500).json(err);
//     }
// }

export const logout = async (req, res) => {
    console.log(req.cookies.token);
    res.clearCookie('token');
    res.status(200).json({ msg: 'Successfully logged out' });
}


export const getUser = async (req, res) => {
    console.log('triggered...')
    const token = req.cookies.token;
    try {

        const user = await jwt.verify(token, config.jwtSecret);
        if (!user) return res.status(401).json({ msg: 'Invalid Token' });
        const getUser = await User.find({});
        if (!getUser) return res.status(404).json({ msg: 'User List Empty :)' });
        const s_user = getUser.map(user => {
            const { password, ...s_user } = user.toObject();
            return s_user;
        })
        return res.status(200).json(s_user);
    }
    catch (err) {
        return res.status(401).json({ msg: err.message });
    }

}

export const loginWithEmail = async (req, res) => {
    const { email } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User Not found' });
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        const link = `http://localhost:4000/api/login/${token}`;

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anakindabir@gmail.com', // replace with your email address
                pass: 'fifxdcgklkofmwxl' // replace with your email password or app-specific password
            }
        })

        const info = await transporter.sendMail({
            from: 'Login <noreply@login.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Login Request", // Subject line
            //text: "Hello world?", // plain text body
            html: `<p>Thanks for login to our site :) </p>
                <a href=${link}>Click here to login</a>`, // html body
        });

        return res.status(200).json({ msg: `Email send successfully ${info.messageId}` });
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server Error' });
    }
}

export const login = (req, res) => {
    const { token } = req.params;
    try {

        const user = jwt.verify(token, config.jwtSecret);
        res.cookie('token', token);
        res.redirect('http://localhost:5173/');
        //res.status(200).json({ msg: 'Logged in...' });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
}





 // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'anakindabir@gmail.com', // replace with your email address
    //         pass: 'fifxdcgklkofmwxl' // replace with your email password or app-specific password
    //     }
    // });
    // const info = await transporter.sendMail({
    //     from: '"Father Foo 👻" <foo@example.com>', // sender address
    //     to: "cheema000068@gmail.com", // list of receivers
    //     subject: "Fuck you ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>idr L vekhdan</b>", // html body
    // });

    // res.json({ msg: `Message sent: ${info.messageId}` })