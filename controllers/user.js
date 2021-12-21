const UserService = require('../services/user');
const { MSG_TYPES } = require('../constant/types');
const { JsonResponse } = require('../lib/apiResponse');
const { validateUser } = require('../request/user');


exports.create = async (req, res, next) => {
    try {
        const {error} = validateUser(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const createUser = await UserService.create(req.body);

        JsonResponse(res, 201, MSG_TYPES.CREATED, createUser)
    } catch (error) {
        console.log({error})
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