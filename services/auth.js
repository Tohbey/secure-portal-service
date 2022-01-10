const { Users, Otps, PasswordRetrive } = require('../models');
const bcrypt = require('bcrypt');
const { mailSender, GenerateOTP, GenerateCode } = require('../utils/index');
const UserService = require('./user');
const { MSG_TYPES } = require('../constant/types');
const jwt = require('jsonwebtoken');
const moment = require("moment");
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


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

                const otpCode = GenerateOTP(4);
                const expiredDate = moment().add(20, "minutes");

                const otpObject = {
                    token: otpCode,
                    expiresAt: expiredDate,
                    userId: user.id,
                }
                const createOTP = await Otps.create(otpObject)
                const token = this.generateAuthToken(user, false);

                resolve({ user, createOTP, token })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static generateAuthToken(user, secondLevel) {
        const token = jwt.sign({
            uuid: user.uuid,
            email: user.email,
            role: user.role,
            secondLevel: secondLevel
        },
            jwtSecret,
            { expiresIn: '24h' })

        return token;
    }

    static secondLevelAuthentication(body, user) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentUser = await Users.findOne({
                    where: {
                        email: user.email,
                        uuid: user.uuid,
                        role: user.role
                    }
                });
                if (!currentUser) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_INVALID })
                }

                const validAnswer = await bcrypt.compare(body.secretAnswer, currentUser.secretAnswer)
                if (!validAnswer) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.INVALID_ANSWER })
                }

                const otp = await Otps.findOne({
                    where: {
                        userId: currentUser.id,
                        token: body.OTPCode
                    }
                });
                if (!otp) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                const token = this.generateAuthToken(user, true);
                await otp.destroy();

                resolve({ currentUser, token })
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
                const salt = await bcrypt.genSalt(10);
                const updatedPassword = await bcrypt.hash(body.newPassword, salt);

                currentUser.password = updatedPassword;

                await currentUser.save();

                resolve(currentUser);
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static resendOTP(email, req) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: {
                        email: email
                    }
                })

                if (!user) {
                    return reject({ statusCode: 401, msg: MSG_TYPES.NOT_FOUND })
                }
                else if (user.isVerified) {
                    return reject({ statusCode: 200, msg: MSG_TYPES.ACCOUNT_HASVERIFIED })
                }

                const token = GenerateOTP(4);
                const expiredDate = moment().add(20, "minutes");

                const newToken = {
                    token: token,
                    userId: user.id,
                    expiresAt: expiredDate
                }

                const otp = await Otps.create(newToken)

                resolve({ user, otp })
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
                    userId: user.id
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
                console.log(email, token)
                const currentDate = new Date();
                const user = await Users.findOne({
                    where: {
                        email: email
                    }
                })
                if (!user) {
                    return reject({ statusCode: 401, msg: MSG_TYPES.NOT_FOUND })
                }

                const passwordRetrive = await PasswordRetrive.findOne({
                    where: {
                        passwordRetrivetoken: token,
                        userId: user.id
                    }
                })
                if (!passwordRetrive) {
                    return reject({ statusCode: 401, msg: MSG_TYPES.NOT_FOUND })
                }
                let msg = 'Redirect to forgot password page';

                resolve(msg)
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
                    include: 'passwordRetrive'
                })

                if (!user) {
                    return reject({ statusCode: 401, msg: MSG_TYPES.NOT_FOUND })
                }
                user.password = body.password;
                const passwordRetrive = await PasswordRetrive.findOne({
                    where: {
                        passwordRetrivetoken: body.token,
                        userId: user.id
                    }
                })
                if (!passwordRetrive) {
                    return reject({ statusCode: 401, msg: MSG_TYPES.NOT_FOUND })
                }

                await passwordRetrive.destroy();

                await user.save();

                resolve({ user })
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
                if (user.otp.token != body.OTPCode) {
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