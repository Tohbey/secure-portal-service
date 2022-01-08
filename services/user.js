const { Users, Otps } = require('../models');
const { mailSender, GenerateOTP } = require('../utils/index');
const { MSG_TYPES } = require('../constant/types');
const moment = require("moment");
class UserService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: {email: body.email}
                });
                
                if(user){
                    return reject({ statusCode: 404, msg: MSG_TYPES.EXIST })
                }

                const createUser = await Users.create(body);
                
                const token = GenerateOTP(4);
                const expiredDate = moment().add(20, "minutes");
                
                const otpObject = {
                    token: token,
                    expiresAt: expiredDate,
                    userId: createUser.id,
                }
                const createOTP = await Otps.create(otpObject)

                resolve({createUser, createOTP});
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await Users.findAll();

                const total = users.length;

                resolve({users, total})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getUser(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: filter,
                    include: [
                        'otp',
                        'passwordRetrive',
                        'questions'
                    ]
                });

                if(!user){
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(user)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static terminateUser(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findOne({
                    where: filter
                })

                user.status = 'suspended';

                await user.save();

                resolve(user)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static updateUser(body, userId) {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = UserService;