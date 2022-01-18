const UserService = require('../services/user');
const { MSG_TYPES } = require('../constant/types');
const { JsonResponse } = require('../lib/apiResponse');
const { validateUser } = require('../request/user');
const bcrypt = require('bcrypt');


exports.create = async (req, res, next) => {
    try {
        const {error} = validateUser(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.secretAnswer = await bcrypt.hash(req.body.secretAnswer, salt);

        const {createUser, createOTP} = await UserService.create(req.body);

        JsonResponse(res, 201, MSG_TYPES.CREATED, createUser, createOTP)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.getCurrentUser = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.user.uuid
        };

        let user = await UserService.getUser(filter);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, user);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.userUUID
        };

        let user = await UserService.getUser(filter);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, user);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getUsers = async (req, res, next) => {
    try {
        let {users, total} = await UserService.getUsers();

        JsonResponse(res, 200, MSG_TYPES.FETCHED, users, total);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.terminateUser = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.user.userUUID
        };

        let user = await UserService.terminateUser(filter);

        JsonResponse(res, 200, MSG_TYPES.SUSPENDED, user);

    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.updateUser = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}