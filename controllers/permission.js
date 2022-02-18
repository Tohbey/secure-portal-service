const PermissionService = require('../services/permission');
const { MSG_TYPES } = require('../constant/types');
const { validatePermission } = require('../request/permission');
const { JsonResponse } = require('../lib/apiResponse');


exports.create = async (req, res, next) => {
    try {
        const { error } = validatePermission(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const createPermissions = await PermissionService.create(req.body, req.user);

        JsonResponse(res, 201, MSG_TYPES.CREATED, createPermissions);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getPermissionByUUID = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.permissionUUID
        };

        let permission = await PermissionService.getPermission(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, permission)
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getPermissionById = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.permissionId
        };

        let permission = await PermissionService.getPermission(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, permission)
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}



exports.getPermissions = async (req, res, next) => {
    try {
        let { permissions, total } = await PermissionService.getPermissions();

        JsonResponse(res, 200, MSG_TYPES.FETCHED, permissions, total);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.deletePermission = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.documentUUID
        }

        await PermissionService.deletePermissions(filter);

        JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.updatePermission = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}