//working
const router = require('express').Router();
const controller = require("../controllers");

router.get('/:reportUUID', controller.question.getQuestion);

router.get('/', controller.question.getQuestions);

router.post('/', controller.question.create);

router.delete('/:reportUUID', controller.question.deleteQuestion);

module.exports = router;