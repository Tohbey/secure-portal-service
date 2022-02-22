//working
const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth');

router.get('/:permissionId', Auth, controllers.permission.getPermission);

router.get('/', Auth, controllers.permission.getPermissions);

router.post('/', Auth, controllers.permission.create);

router.delete('/:permissionUUID', Auth, controllers.permission.deletePermission);

module.exports = router