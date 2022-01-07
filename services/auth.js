const { Users, Otps, PasswordRetrive } = require('../models');
const bcrypt = require('bcrypt');
const { mailSender, GenerateOTP, GenerateCode } = require('../utils/index');
const UserService = require('./user');
const { MSG_TYPES } = require('../constant/types');

class AuthService {

    static login(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: { email: body.email }
                });
                if (!user) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_INVALID })
                }
                if (!user.isVerified) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_NOTVERIFIED })
                }

                const validPassword = await bcrypt.compare(body.password, user.password)
                if (!validPassword) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.INVALID_PASSWORD })
                }

                const token = user.generateAuthToken()
                resolve({ user, token })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static updatePassword(user, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentUser = await Users.findOne({
                    where: {
                        uuid: user.uuid,
                        status: 'active'
                    }
                })

                if (!currentUser) {
                    reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_EXIST })
                }

                const validPassword = await bcrypt.compare(
                    body.oldPassword,
                    currentUser.password
                )

                if (!validPassword) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_INVALID });
                }
                const salt = await bcrypt.genSalt(saltNumber);
                const updatedPassword = await bcrypt.hash(body.newPassword, salt);

                resolve()
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static resendToken(email, req) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: {
                        email: email
                    }
                })

                if (!user) {
                    return reject({ statusCode: 401, msg: MSG_TYPES.NOT_FOUND })
                } else if (user.isVerified) {
                    return reject({ statusCode: 200, msg: MSG_TYPES.ACCOUNT_HASVERIFIED })
                }

                const token = GenerateOTP(4);
                const expiredDate = moment().add(20, "minutes");

                const newToken = {
                    token: token,
                    expiredDate: expiredDate
                }

                const otp = await Otp.create(newToken)


                resolve({user, otp})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static recover(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: {
                        email: body.email
                    }
                })
                if (!user) {
                    reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
                    return;
                }

                const token = GenerateCode(16);
                const expiredDate = moment().add(20, "minutes");

                const passwordRetrive = await PasswordRetrive.create({
                    passwordRetrivetoken: token,
                    expiresAt: expiredDate,
                    user: user.id
                })
                

                resolve({ user, passwordRetrive })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static reset(email, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentDate = new Date();
                const user = await Users.findOne({
                    where: {
                        email: email
                    }
                })
                if(!user){
                    return reject({statusCode:401, msg: MSG_TYPES.NOT_FOUND})
                }

                const passwordRetrive = await PasswordRetrive.findOne({
                    where: {
                        passwordRetrivetoken: token,
                        userId: user.id
                    }
                })
                if(!passwordRetrive){
                    return reject({statusCode:401, msg: MSG_TYPES.NOT_FOUND})
                }

                resolve({msg: 'Redirect to forgot password'})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static resetPassword(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: {
                        email: body.email
                    },
                    include:'passwordRetrive'
                })

                if(!user){
                    return reject({statusCode:401, msg: MSG_TYPES.NOT_FOUND})
                }
                // user.password = body.password;

                // await user.save();

                resolve({user})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static verify(body) {
        return new Promise(async (resolve, reject) => {
            try { 
                const filter = {
                    email: body.email
                }

                const user = await UserService.getUser(filter)
                if(user.otp.token != body.OTPCode){
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                const otp = await Otps.findOne({
                    where: {
                        uuid: user.otp.uuid
                    }
                })
                user.status = 'active';
                user.isVerified = true;

                await otp.destroy();
                await user.save();

                resolve(user)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = AuthService