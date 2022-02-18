const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth');

router.get('/:permissionUUID', Auth, controllers.permission.getPermissionByUUID);

router.get('/:permissionId', Auth, controllers.permission.getPermissionById);

router.get('/', Auth, controllers.permission.getPermissions);

router.post('/', Auth, controllers.permission.create);

router.delete('/:permissionUUID', Auth, controllers.permission.deletePermission);

