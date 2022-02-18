const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth');

router.post('/', Auth, controllers.sharedDocument.create);

router.get('/user', Auth, controllers.sharedDocument.getSharedDocumentsByUser);

router.get('/:sharedDocumentUUID', Auth, controllers.sharedDocument.getSharedDocument);

router.delete('/:sharedDocumentUUID', Auth, controllers.sharedDocument.deleteSharedDocument);

module.exports = router