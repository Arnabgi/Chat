const model = require('../models');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const userModel = model.user;
module.exports={
    signIn: async(loginData,token) => {
        try {
            const checkEmail = await userModel.findOne({
                attributes:['email','password','id'],
                where:{
                    email : loginData.email,
                    is_login: 0
                }
            });
            //console.log("logData........",checkEmail);
            if(checkEmail){
                //console.log("checkEmail.........",loginData);
                const matchPassword = await bcrypt.compare(loginData.password,checkEmail.password);
                //console.log("matchPassword.........",matchPassword);
                if(!matchPassword){
                    return {
                        status:401,
                        msg: "Password is wrong"
                    }
                }
                await userModel.update({is_login: 1},{
                    where : {
                        id : checkEmail.id
                    }
                });
                const logData = jwt.sign(checkEmail.toJSON(),token);
                return {
                    status: 200,
                    msg: "Login Success",
                    data: logData
                }; 
            }   
            else{
                return {
                    status:401,
                    msg: "Login Failed",
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    addUser : async(value)=> {
        try {
            const craeteUserData = await userModel.create(value);
            if(craeteUserData){
                return {
                    status: 200,
                    msg: "Data added successfully",
                    data: craeteUserData.toJSON()
                };
            }
            else{
                return{
                    status:401,
                    msg: "Data added failed"
                }
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
}