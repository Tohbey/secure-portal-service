const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.get('/', controllers.document.getDocuments);

router.get('/user', controllers.document.getDocumentsByUser);

router.get('/:documentUUID', controllers.document.getDocument);

router.patch('/:documentUUID', controllers.document.updateDocument);

router.post('/', controllers.document.create);

router.post('/share/:documentUUID', Auth, controllers.document.shareDocument);

module.exports = router
