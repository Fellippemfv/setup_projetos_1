import { Router } from "express";
import Auth from "../controllers/Auth";
import authUser from "../middlewares/authUser"
const routes = new Router();
 
routes.get('/register', authUser.forwardAuth, Auth.getRegister );
routes.post('/register', Auth.register);

routes.get('/login', authUser.forwardAuth, Auth.getLogin );
routes.post('/login', Auth.login);

routes.get('/forgot-password', Auth.getForgotPassword );
routes.put('/forgot-password', Auth.forgotPassword);

routes.get('/resetpassword/:id', Auth.getResetPassword);
routes.put('/resetpassword', Auth.resetPassword);

routes.get('/logout', Auth.getLogout);//falta ejitar logout d admin

export default routes;