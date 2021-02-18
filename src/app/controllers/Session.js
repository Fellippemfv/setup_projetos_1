import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../app/config/auth"
import bcrypt from "bcrypt"

class SessionController {
    async store(req, res, next) {
        try{
          
          const { email, password } = req.body;
          
          const user = await User.findByEmail(email)
          if(!user) {//validaçao1 de email valido
              return res.status(401).json({ error: " User not found" })
          }
          
          const result = await bcrypt.compare(password, user.password_hash);
          if(!result) {//validaçao1 desenha valida
            return res.status(401).json({ error: "Password invalid" })
          }
         
          const {id, name, provider} = user;
            return res.json({
              user: {
                id,
                name, 
                email,
                provider
              },
              token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
              }),
            })
          

        }catch(error){
          next(error)
        }
  }
}

export default new SessionController();