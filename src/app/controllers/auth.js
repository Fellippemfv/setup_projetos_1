import mysql from "mysql2"
const jwt = require('jsonwebtoken');
import bcrypt from "bcrypt"
//const mailgun = require('mailgun-js');
const DOMAIN = process.env.DOMAIN_NAME;
//const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: "12345",
    database: 'knex_test'
}); 

exports.login = (req, res, next) => {
    try {
        
        const { email, password } = req.body;
        if (!email || !password) {//observando se NÂO enviou os dados
            return res.status(400).render('login', {
                message: 'All fields are mandatory!'
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
                        const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRE
                        });
                            res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                            res.redirect('/user/dashboard');
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

exports.register = (req, res, next) => {

    const { name, email, password, passwordConfirm } = req.body;
    let sql1 = 'SELECT email FROM users WHERE email = ?';
    db.query(sql1, [email], async (err, result) => {
        if (err)
            throw err;

        if (result.length > 0) {
            return res.render('register', {
                message: 'Este email já foi cadastrado'
            });
        } else if (password != passwordConfirm) {
            return res.render('register', {
                message: 'Senhas não conferem'
            });
        }

        let hashed = await bcrypt.hash(password, 8);

        let sql2 = 'INSERT INTO users SET ?';
        db.query(sql2, { name: name, email: email, password_hash: hashed, provider: 1 }, (err, result) => {
            if (err)
                throw err;
            else {
                return res.redirect('/user/login');
            }
        })

    });
}

exports.getForgotPassword = (req, res, next) => {
    res.render('forgotPassword');
}

exports.forgotPassword = (req, res, next) => {
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

            const token = jwt.sign({ _id: results[0].uid }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });
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
}

exports.getResetPassword = (req, res, next) => {
    const resetLink = req.params.id;
    res.render('resetPassword', { message: "Link Verified! Reset Your password", resetLink })
}

exports.resetPassword = (req, res, next) => {
    const { resetLink, password, confirmPass } = req.body;

    if (password !== confirmPass) {
        // This should be handled by flashing a message!

        res.redirect(`/user/resetpassword/${resetLink}`);
    } else {
        if (resetLink) {
            jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, data) => {
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
}

exports.getLogout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}