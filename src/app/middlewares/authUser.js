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
                    } else if(result.provider === 0 || result.provider === 1 || result.provider === 2){
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
                        res.redirect('/admin/dashboard');//talvez tirar
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