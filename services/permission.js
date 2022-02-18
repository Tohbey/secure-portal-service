const { MSG_TYPES } = require('../constant/types');
const { Permissions } = require('../models');


class PermissionService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await Permissions.findOne({
                    where: {permission: body.permission}
                });

                if(permission){
                    return reject({ statusCode: 404, msg: MSG_TYPES.EXIST });
                }

                const createPermissions = await Permissions.create(body);

                resolve(createPermissions);
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getPermission(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await Permissions.findOne({
                    where: filter,
                });

                if(!permission){
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(permission)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getPermissions() {
        return new Promise(async (resolve, reject) => {
            try {
                const permissions = await Permissions.findAll();

                const total = permissions.length;

                resolve({permissions, total})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static deletePermissions(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const permission = await Permissions.findOne({
                    where: filter
                })

                await permission.destroy();

                resolve({msg: MSG_TYPES.DELETED})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static updatePermissions(body, permissionId) {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = PermissionService;