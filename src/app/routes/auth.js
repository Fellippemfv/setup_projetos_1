import express from "express"
import User from "../controllers/Auth"
import authUser from "../middlewares/authUser"

const router = express.Router();


router.get('/register', authUser.forwardAuth, (req, res, next) => {
    res.render('register');
});

router.post('/register', User.register);

router.get('/login', authUser.forwardAuth, (req, res, next) => {
    res.render('login');
});

router.post('/login', User.login);


router.get('/forgot-password', User.getForgotPassword);
router.put('/forgot-password', User.forgotPassword);

router.get('/resetpassword/:id', User.getResetPassword);
router.put('/resetpassword', User.resetPassword);

router.get('/logout', User.getLogout);


export default router;