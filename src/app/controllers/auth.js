import mysql from "mysql2"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//const mailgun = require('mailgun-js');
//const DOMAIN = process.env.DOMAIN_NAME;
//const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
import env from "dotenv";
env.config();

const db = mysql.createConnection({
        host: process.env.DB_HOST, 
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
});

db.connect((err) => {
        if (err)
            throw err;
        else
            console.log("Mysql Connected")
});

    class AuthController{

        async getLogin(req, res, next) { 
            try{ 
                res.render('login', {message: ""});
            }catch(error){
                next(error);
            }
        }

        async login(req, res, next) {
            try {
            
                const { email, password } = req.body;
                if (!email || !password) {//observando se NÂO enviou os dados
                    return res.status(400).render('login', {
                        message: 'Você precisa preencher todos os campos', 
                    })
                } 
        
                if (email && password) {//observando se enviou os dados
        
                    if(email){
                        let sql11 = 'SELECT email FROM users WHERE email = ?';//comparando se existe e email
                        db.query(sql11, [email], async (err, results) => {
                        if (results.length == 0) {
                            return res.status(401).render('login', {
                                message: 'Este email é inválido'
                            }); 
                        }else {
                            let sql3 = 'SELECT * FROM users WHERE email = ?';//comparando senha e email
                            db.query(sql3, [email], async (err, results) => {  
                            if (!results || !(await bcrypt.compare(password, results[0].password_hash))) {
                                res.status(401).render('login', {
                                    message: "Email e/ou senha Incorreto"
                                });
                            }else {
                                const user = results[0];
                                const token = jwt.sign({ id: user.id, provider: user.provider }, process.env.JWT_SECRET, {
                                    expiresIn: process.env.JWT_EXPIRE
                                });
                                    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                                    if(user.provider === 1) {
                                        res.redirect('/admin/dashboard');
                                    }
                                    if(user.provider === 0) {
                                        res.redirect('/');
                                    }
                                }
                    
                            });
                        }
                    });
                }
            
                }
        
            } catch (err) {
                throw err;
            }
        }

        async getRegister(req, res, next) {
            try{
                res.render('register', {message: ""});
            }catch(error){
                next(error);
            }
        }

        async register(req, res, next) {

            try {
                const { name, email, password, passwordConfirm } = req.body;
                let sql1 = 'SELECT email FROM users WHERE email = ?';
                db.query(sql1, [email], async (err, result) => {
                if (err)
                    throw err;
        
                if (result.length > 0) {
                    return res.render('register', {
                        message: 'Este email já foi cadastrado'
                    });
                }  
                if (password != passwordConfirm) {
                    return res.render('register', {
                        message: 'Senhas não conferem'
                    });
                }
        
                let hashed = await bcrypt.hash(password, 8);
        
                let sql2 = 'INSERT INTO users SET ?';
                db.query(sql2, { name: name, email: email, password_hash: hashed, provider: 0 }, (err, result) => {
                    if (err)
                        throw err;
                    else {
                        return res.redirect('/user/login');
                    }
                })
        
            });
            
            } catch (err) {
                throw err;
            }
            
        }

        async getForgotPassword(req, res, next) {
            try{
                res.render('forgotPassword');
            }catch(error){
                next(error);
            }
        }

        async forgotPassword(req, res, next) {
            try{
                const { email } = req.body;
                if (!email) {
                    return res.status(400).render('forgotPassword', {
                        message: 'All fields are mandatory!'
                    })
                }
            
                const sql1 = 'SELECT * from users WHERE email = ?';
                db.query(sql1, [email], async (err, results) => {
                    if (err) throw err;
                    else {
                        if (!results) {
                            res.status(401).render('forgotPassword', {
                                message: "That email is not registered!"
                            });
                        }
            
                        const token = jwt.sign({ _id: results[0].id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });
                        const data = {
                            from: 'noreplyCMS@mail.com',
                            to: email,
                            subject: 'Reset Password Link',
                            html: `<h2>Please click on given link to reset your password</h2>
                                    <p>${process.env.URL}/user/resetpassword/${token}</p>
                            `
                        };
            
                        const sql2 = 'UPDATE users SET resetLink = ? WHERE email = ?';
                        db.query(sql2, [token, email], (err, success) => {
                            if (err)
                                res.render('forgotPassword', { message: 'Error in resetLink' });
                            else {
                                mg.messages().send(data, (err, body) => {
                                    if (err) res.render('forgotPassword', { message: err });
                                    else {
                                        console.log('Email sent!');
                                        console.log(body);
                                        res.render('forgotPassword', { message: "Email Sent Successfully!" })
                                    }
                                });
                            }
                        });
                    }
                });
            }catch(error){
                next(error);
            }
        }

        async getResetPassword(req, res, next) {
            try{
                const resetLink = req.params.id;
                res.render('resetPassword', { message: "Link Verified! Reset Your password", resetLink })
            }catch(error){
                next(error);
            }
        }

        async resetPassword(req, res, next) {
            try{
                const { resetLink, password, confirmPass } = req.body;

                if (password !== confirmPass) {
                    // This should be handled by flashing a message!
            
                    res.redirect(`/user/resetpassword/${resetLink}`);
                } else {
                    if (resetLink) {
                        await jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, data) => {
                            if (err) {
                                res.render('resetPassword', { message: "Token Expired" });
                            } else {
                                const sql1 = 'SELECT * FROM users WHERE resetLink = ?';
                                db.query(sql1, [resetLink], async (err, results) => {
                                    if (err || results.length === 0) {
                                        res.render('resetPassword', { message: "Token Expired" });
                                    } else {
                                        let hashed = await bcrypt.hash(password, 8);
            
                                        const sql2 = 'UPDATE users SET passwrd = ? WHERE resetLink = ?';
                                        db.query(sql2, [hashed, resetLink], (errorData, retData) => {
                                            if (errorData) {
                                                res.render('resetPassword', { message: errorData });
                                            } else {
                                                // This is the success part!
                                                // Follow up : Disable the jwt token : same as logout
                                                res.redirect('/user/login');
                                            }
                                        })
                                    }
                                });
                            }
            
                        })
                    } else {
                        res.render('resetPassword', { message: "Authentication Error!!" });
                    }
                }
            }catch(error){
                next(error);
            }
        }

        async getLogout(req, res, next) {
            try{
                res.cookie('jwt', '', { maxAge: 1 });
                res.redirect('/');
            }catch(error){
                next(error);
            }
        }

    }


export default new AuthController();