const userService = require('../service/user.service');
const bcrypt = require('bcrypt');
module.exports={
    signIn: async(req,res)=> {
        const token = process.env.JWT_SECRET_KEY;
        try {
            let logData = {
                email: req.body.email,
                password: req.body.password,
            };
            let loginData = await userService.signIn(logData,token);
            res.json({
                    status : loginData.status ? loginData.status : '', 
                    message : loginData.msg ? loginData.msg : '',
                    data : loginData.data ? loginData.data : ''
                });
        } catch (error) {
            res.send(error);
        }
    },

    addUser: async(req,res)=> {
        try {
            const salt = await bcrypt.genSalt(10);
            let data = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password,salt), 
                is_login: 0
            }
            let createUserData = await userService.addUser(data);
            res.json({
                status : createUserData.status ? createUserData.status : '', 
                message : createUserData.msg ? createUserData.msg : '',
                data : createUserData.data ? createUserData.data : ''
            });
        } catch (error) {
           // console.log("error..........",error);
            res.send(error);
        }
    },
}