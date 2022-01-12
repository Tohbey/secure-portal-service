const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.get('/', Auth, controllers.document.getDocuments);

router.get('/user', Auth, controllers.document.getDocumentsByUser);

router.get('/:documentUUID', Auth, controllers.document.getDocument);

router.patch('/:documentUUID', Auth, controllers.document.updateDocument);

router.delete('/:documentUUID', Auth, controllers.document.deleteDocument);

router.post('/', Auth, controllers.document.create);

//not working yet
router.post('/share/:documentUUID', Auth, controllers.document.shareDocument);

module.exports = router
