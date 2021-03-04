import express from "express"
import User from "../controllers/auth"
import Auth from "../middlewares/auth"
const router = express.Router();


router.get('/register', Auth.forwardAuth, (req, res, next) => {
    res.render('auth/register');
});

router.post('/register', User.register);

router.get('/login', Auth.forwardAuth, (req, res, next) => {
    res.render('auth/login');
});

router.post('/login', User.login);


router.get('/dashboard', Auth.requireAuth, (req, res) => {
    res.render('admin/dashboard', { user: req.user });
});

router.get('/forgot-password', User.getForgotPassword);
router.put('/forgot-password', User.forgotPassword);

router.get('/resetpassword/:id', User.getResetPassword);
router.put('/resetpassword', User.resetPassword);

router.get('/logout', User.getLogout);


export default router;