import jwt from "jsonwebtoken";

class authController{

    //Para entrar precisa estar autenticado
    async requireAuth(req, res, next) {
        try {

            const token = req.cookies.jwt;
            if (token) {
                await jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/login');
                    } else if(result.provider === 2){
                        req.user = result.id;
                        next();
                    }else{
                        res.redirect('/');

                    }
                })
            } else {
                res.redirect('/login')
            }
           
            
        } catch (error) {
            next(error)
        }
    }

}

export default new authController();