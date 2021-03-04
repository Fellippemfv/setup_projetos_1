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
                        res.redirect('/user/login');
                    } else {
                        console.log(result);
                        req.user = result.id;
                        next();
                    }
                })
            } else {
                res.redirect('/user/login')
            }
           
            
        } catch (error) {
            next(error)
        }
    }

    //Se estiver autenticado não entra pois não precisa
    async forwardAuth(req, res, next) {
        try {

            const token = req.cookies.jwt;
            if (token) {
                await jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
                    if (err) {
                        console.log(err);
                        next();
                    } else {
                        req.user = result.id;
                        res.redirect('/user/dashboard');
                    }
                });
            } else {
                next();
            }  
                   
                    
        } catch (error) {
            next(error)
        }
    }

}

export default new authController();