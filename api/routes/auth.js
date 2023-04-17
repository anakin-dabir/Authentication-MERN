import express from 'express';
import { register, login, logout, getUser, loginWithEmail } from '../controllers/user';


const userRoute = express.Router();

userRoute.route('/register')
    .post(register);

userRoute.route('/login')
    // .post(login);
    .post(loginWithEmail);
userRoute.route('/login/:token')
    .get(login);
userRoute.route('/logout')
    .post(logout);
userRoute.route('/getUser')
    .get(getUser);
export default userRoute;