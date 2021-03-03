import express from "express"
import authController from "../controllers/auth"
import {requireAuth, forwardAuth} from "../middlewares/auth"
const router = express.Router();


router.get('/register', forwardAuth, (req, res, next) => {
    res.render('auth/register');
});

router.post('/register', authController.register);

router.get('/login', forwardAuth, (req, res, next) => {
    res.render('auth/login');
});

router.post('/login', authController.login);


router.get('/dashboard', requireAuth, (req, res) => {
    res.render('admin/dashboard', { user: req.user });
});

router.get('/forgot-password', authController.getForgotPassword);
router.put('/forgot-password', authController.forgotPassword);

router.get('/resetpassword/:id', authController.getResetPassword);
router.put('/resetpassword', authController.resetPassword);

router.get('/logout', authController.getLogout);


export default router;